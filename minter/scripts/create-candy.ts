import {
  percentAmount,
  some,
  publicKey,
  keypairIdentity,
  generateSigner,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplCandyMachine,
  create,
} from "@metaplex-foundation/mpl-candy-machine";
import { TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import dotenv from "dotenv";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { NETWORK } from "./utils";
dotenv.config();

async function main() {
  // Use the RPC endpoint of your choice.
  const umi = createUmi(NETWORK).use(mplCandyMachine());

  const user = await getKeypairFromFile(process.env.KEYPAIR_PATH!);
  const signer = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
  umi.use(keypairIdentity(signer));

  const collection = publicKey(process.env.COLLECTION_ID!);

  console.log("Creating Candy Machine...");
  const candyMachine = generateSigner(umi);
  await (
    await create(umi, {
      symbol: "GLIMBI",
      candyMachine,
      authority: signer.publicKey,
      collectionMint: collection,
      collectionUpdateAuthority: umi.identity,
      tokenStandard: TokenStandard.NonFungible,
      sellerFeeBasisPoints: percentAmount(5, 2),
      itemsAvailable: 10,
      creators: [
        { address: signer.publicKey, percentageShare: 100, verified: false },
      ],
      configLineSettings: some({
        prefixName: "Glimbi Tales #$ID+1$",
        nameLength: 0,
        prefixUri: "https://peach-necessary-primate-505.mypinata.cloud/ipfs/",
        uriLength: 115,
        isSequential: false,
      }),
    })
  ).sendAndConfirm(umi);
  console.log(`Candy Machine: ${candyMachine.publicKey}`);
}

main().catch(console.error);
