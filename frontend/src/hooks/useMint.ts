/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CandyGuard,
  CandyMachine,
} from "@metaplex-foundation/mpl-candy-machine";
import { GuardReturn } from "../utils/checkerHelper";
import {
  AddressLookupTableInput,
  KeypairSigner,
  PublicKey,
  Transaction,
  Umi,
  createBigInt,
  generateSigner,
  publicKey,
  signAllTransactions,
} from "@metaplex-foundation/umi";
import {
  DigitalAsset,
  DigitalAssetWithToken,
  JsonMetadata,
  fetchDigitalAsset,
  fetchJsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { mintText } from "@/components/settings";
import {
  createStandaloneToast,
} from "@chakra-ui/react";
import {
  fetchAddressLookupTable, setComputeUnitPrice,
} from "@metaplex-foundation/mpl-toolbox";
import { Dispatch, SetStateAction } from "react";
import {
  chooseGuardToUse,
  routeBuilder,
  mintArgsBuilder,
  GuardButtonList,
  buildTx,
  getRequiredCU,
} from "../utils/mintHelper";
import { verifyTx } from "@/utils/verifyTx";
import { base58 } from "@metaplex-foundation/umi/serializers";

export const updateLoadingText = (
  loadingText: string | undefined,
  guardList: GuardReturn[],
  label: string,
  setGuardList: Dispatch<SetStateAction<GuardReturn[]>>
) => {
  const guardIndex = guardList.findIndex((g) => g.label === label);
  if (guardIndex === -1) {
    console.error("guard not found");
    return;
  }
  const newGuardList = [...guardList];
  newGuardList[guardIndex].loadingText = loadingText;
  setGuardList(newGuardList);
};

export const fetchNft = async (
  umi: Umi,
  nftAdress: PublicKey,
) => {
  let digitalAsset: DigitalAsset | undefined;
  let jsonMetadata: JsonMetadata | undefined;
  try {
    digitalAsset = await fetchDigitalAsset(umi, nftAdress);
    jsonMetadata = await fetchJsonMetadata(umi, digitalAsset.metadata.uri);
  } catch (e) {
    console.error(e);
    createStandaloneToast().toast({
      title: "Nft could not be fetched!",
      description: "Please check your Wallet instead.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }

  return { digitalAsset, jsonMetadata };
};

export const mintClick = async (
  umi: Umi,
  guard: GuardReturn,
  candyMachine: CandyMachine,
  candyGuard: CandyGuard,
  ownedTokens: DigitalAssetWithToken[],
  mintAmount: number,
  mintsCreated:
    | {
        mint: PublicKey;
        offChainMetadata: JsonMetadata | undefined;
      }[]
    | undefined,
  setMintsCreated: Dispatch<
    SetStateAction<
      | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
      | undefined
    >
  >,
  guardList: GuardReturn[],
  setGuardList: Dispatch<SetStateAction<GuardReturn[]>>,
  onOpen: () => void,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
) => {
  const guardToUse = chooseGuardToUse(guard, candyGuard);
  if (!guardToUse.guards) {
    console.error("no guard defined!");
    return;
  }

  const buyBeer = false;
  try {
    //find the guard by guardToUse.label and set minting to true
    const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
    if (guardIndex === -1) {
      console.error("guard not found");
      return;
    }
    const newGuardList = [...guardList];
    newGuardList[guardIndex].minting = true;
    setGuardList(newGuardList);

    let routeBuild = await routeBuilder(umi, guardToUse, candyMachine);
    if (routeBuild && routeBuild.items.length > 0) {
      createStandaloneToast().toast({
        title: "Allowlist detected. Please sign to be approved to mint.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      routeBuild = routeBuild.prepend(setComputeUnitPrice(umi, { microLamports: parseInt(process.env.NEXT_PUBLIC_MICROLAMPORTS ?? "1001") }));
      const latestBlockhash = await umi.rpc.getLatestBlockhash({commitment: "finalized"});
      routeBuild = routeBuild.setBlockhash(latestBlockhash)
      const builtTx = await routeBuild.buildAndSign(umi);
      const sig = await umi.rpc
        .sendTransaction(builtTx, { skipPreflight:true, maxRetries: 1, preflightCommitment: "finalized", commitment: "finalized" })
        .then((signature) => {
          return { status: "fulfilled", value: signature };
        })
        .catch((error) => {
          createStandaloneToast().toast({
            title: "Allow List TX failed!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return { status: "rejected", reason: error, value: new Uint8Array };

        });
        if (sig.status === "fulfilled")
          await verifyTx(umi, [sig.value], latestBlockhash, "finalized");

    }

    // fetch LUT
    let tables: AddressLookupTableInput[] = [];
    const lut = process.env.NEXT_PUBLIC_LUT;
    if (lut) {
      const lutPubKey = publicKey(lut);
      const fetchedLut = await fetchAddressLookupTable(umi, lutPubKey);
      tables = [fetchedLut];
    } else {
      createStandaloneToast().toast({
        title: "The developer should really set a lookup table!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    const mintTxs: Transaction[] = [];
    const nftsigners = [] as KeypairSigner[];

    const latestBlockhash = (await umi.rpc.getLatestBlockhash({commitment: "finalized"}));
    
    const mintArgs = mintArgsBuilder(candyMachine, guardToUse, ownedTokens);
    const nftMint = generateSigner(umi);
    const txForSimulation = buildTx(
      umi,
      candyMachine,
      candyGuard,
      nftMint,
      guardToUse,
      mintArgs,
      tables,
      latestBlockhash,
      1_400_000,
      buyBeer
    );
    const requiredCu = await getRequiredCU(umi, txForSimulation);

    for (let i = 0; i < mintAmount; i++) {
      const nftMint = generateSigner(umi);
      nftsigners.push(nftMint);
      const transaction = buildTx(
        umi,
        candyMachine,
        candyGuard,
        nftMint,
        guardToUse,
        mintArgs,
        tables,
        latestBlockhash,
        requiredCu,
        buyBeer
      );
      console.log(transaction)
      mintTxs.push(transaction);
    }
    if (!mintTxs.length) {
      console.error("no mint tx built!");
      return;
    }

    updateLoadingText(`Please sign`, guardList, guardToUse.label, setGuardList);
    
    const signatures: Uint8Array[] = [];

      const signedTransactions = await signAllTransactions(
        mintTxs.map((transaction, index) => ({
          transaction,
          signers: [umi.payer, nftsigners[index]],
        }))
      );
  
      let amountSent = 0;
      
      const sendPromises = signedTransactions.map((tx, index) => {
        return umi.rpc
          .sendTransaction(tx, { skipPreflight:true, maxRetries: 1, preflightCommitment: "finalized", commitment: "finalized" })
          .then((signature) => {
            console.log(
              `Transaction ${index + 1} resolved with signature: ${
                base58.deserialize(signature)[0]
              }`
            );
            amountSent = amountSent + 1;
            signatures.push(signature);
            return { status: "fulfilled", value: signature };
          })
          .catch((error) => {
            console.error(`Transaction ${index + 1} failed:`, error);
            return { status: "rejected", reason: error };
          });
      });
  
      await Promise.allSettled(sendPromises);
  
      if (!(await sendPromises[0]).status === true) {
        // throw error that no tx was created
        throw new Error("no tx was created");
      }
    
    updateLoadingText(
      `finalizing transaction(s)`,
      guardList,
      guardToUse.label,
      setGuardList
    );

    createStandaloneToast().toast({
      title: `${signatures.length} Transaction(s) sent!`,
      status: "success",
      duration: 3000,
    });
    
    const successfulMints = await verifyTx(umi, signatures, latestBlockhash, "finalized");

    updateLoadingText(
      "Fetching your NFT",
      guardList,
      guardToUse.label,
      setGuardList
    );

    // Filter out successful mints and map to fetch promises
    const fetchNftPromises = successfulMints.map((mintResult) =>
      fetchNft(umi, mintResult).then((nftData) => ({
        mint: mintResult,
        nftData,
      }))
    );

    const fetchedNftsResults = await Promise.all(fetchNftPromises);

    // Prepare data for setting mintsCreated
    const newMintsCreated: { mint: PublicKey; offChainMetadata: JsonMetadata }[] =
      [];
    fetchedNftsResults.map((acc) => {
      if (acc.nftData.digitalAsset && acc.nftData.jsonMetadata) {
        newMintsCreated.push({
          mint: acc.mint,
          offChainMetadata: acc.nftData.jsonMetadata,
        });
      }
      return acc;
    }, []);

    // Update mintsCreated only if there are new mints
    if (newMintsCreated.length > 0) {
        setMintsCreated(newMintsCreated);
        onOpen();
    }
  } catch (e) {
    console.error(`minting failed because of ${e}`);
    createStandaloneToast().toast({
      title: "Your mint failed!",
      description: "Please try again.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } finally {
    //find the guard by guardToUse.label and set minting to true
    const guardIndex = guardList.findIndex((g) => g.label === guardToUse.label);
    if (guardIndex === -1) {
      console.error("guard not found");
      return;
    }
    const newGuardList = [...guardList];
    newGuardList[guardIndex].minting = false;
    setGuardList(newGuardList);
    setCheckEligibility(true);
    updateLoadingText(undefined, guardList, guardToUse.label, setGuardList);
  }
};

type Props = {
  guardList: GuardReturn[];
  candyMachine: CandyMachine | undefined;
  candyGuard: CandyGuard | undefined;
};

export function useButtonList({
  guardList,
  candyMachine,
  candyGuard,
}: Props) {
  const buttonGuardList: GuardButtonList[] = [];

  if (!candyMachine || !candyGuard) {
    return {
      buttonGuardList
    };
  }

  // remove duplicates from guardList
  //fucked up bugfix
  let filteredGuardlist = guardList.filter(
    (elem, index, self) =>
      index === self.findIndex((t) => t.label === elem.label)
  );
  if (filteredGuardlist.length === 0) {
    return {
      buttonGuardList
    };
  }
  // Guard "default" can only be used to mint in case no other guard exists
  if (filteredGuardlist.length > 1) {
    filteredGuardlist = guardList.filter((elem) => elem.label != "default");
  }
  for (const guard of filteredGuardlist) {
    const text = mintText.find((elem) => elem.label === guard.label);
    // find guard by label in candyGuard
    const group = candyGuard.groups.find((elem) => elem.label === guard.label);
    let startTime = createBigInt(0);
    let endTime = createBigInt(0);
    if (group) {
      if (group.guards.startDate.__option === "Some") {
        startTime = group.guards.startDate.value.date;
      }
      if (group.guards.endDate.__option === "Some") {
        endTime = group.guards.endDate.value.date;
      }
    }

    const buttonElement: GuardButtonList = {
      label: guard ? guard.label : "default",
      allowed: guard.allowed,
      header: text ? text.header : "header missing in settings.tsx",
      mintText: text ? text.mintText : "mintText missing in settings.tsx",
      buttonLabel: text
        ? text.buttonLabel
        : "buttonLabel missing in settings.tsx",
      startTime,
      endTime,
      tooltip: guard.reason,
      maxAmount: guard.maxAmount,
    };
    buttonGuardList.push(buttonElement);
  }

  return {
    buttonGuardList
  }
}
