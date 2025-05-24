"use client";

import { MarketCard } from "@/components/marketplace/market-card";
// import { MarketFilter } from "@/components/marketplace/market-filter";
import { NFTS } from "@/components/marketplace/nfts";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Center,
  Container,
  HStack,
  Spinner,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useUmi } from "@/utils/useUmi";
import { guardChecker } from "@/utils/checkAllowed";
import { GuardReturn } from "@/utils/checkerHelper";
import { ShowNft } from "@/components/showNft";
import { useSolanaTime } from "@/utils/SolanaTimeContext";
import { PublicKey, publicKey } from "@metaplex-foundation/umi";
import {
  DigitalAssetWithToken,
  JsonMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { useEffect, useMemo, useState } from "react";
import { mintClick, useButtonList } from "@/hooks/useMint";
import { GuardButtonList } from "@/utils/mintHelper";
import { useCandyMachine } from "@/hooks/useCandy";

export default function Home() {
  const umi = useUmi();
  const solanaTime = useSolanaTime();
  const toast = useToast();
  const {
    isOpen: isShowNftOpen,
    onOpen: onShowNftOpen,
    onClose: onShowNftClose,
  } = useDisclosure();
  const [mintsCreated, setMintsCreated] = useState<
    | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
    | undefined
  >();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [ownedTokens, setOwnedTokens] = useState<DigitalAssetWithToken[]>();
  const [guards, setGuards] = useState<GuardReturn[]>([
    { label: "startDefault", allowed: false, maxAmount: 0 },
  ]);
  const [firstRun, setFirstRun] = useState(true);
  const [checkEligibility, setCheckEligibility] = useState<boolean>(true);

  if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
    console.error("No candy machine in .env!");
    if (!toast.isActive("no-cm")) {
      toast({
        id: "no-cm",
        title: "No candy machine in .env!",
        description: "Add your candy machine address to the .env file!",
        status: "error",
        duration: 999999,
        isClosable: true,
      });
    }
  }
  const candyMachineId: PublicKey = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
      return publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
    } else {
      console.error(`NO CANDY MACHINE IN .env FILE DEFINED!`);
      toast({
        id: "no-cm",
        title: "No candy machine in .env!",
        description: "Add your candy machine address to the .env file!",
        status: "error",
        duration: 999999,
        isClosable: true,
      });
      return publicKey("11111111111111111111111111111111");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { candyMachine, candyGuard } = useCandyMachine(
    umi,
    candyMachineId,
    checkEligibility,
    setCheckEligibility,
    firstRun,
    setFirstRun
  );

  useEffect(() => {
    const checkEligibilityFunc = async () => {
      if (!candyMachine || !candyGuard || !checkEligibility || isShowNftOpen) {
        return;
      }
      setFirstRun(false);

      const { guardReturn, ownedTokens } = await guardChecker(
        umi,
        candyGuard,
        candyMachine,
        solanaTime
      );

      setOwnedTokens(ownedTokens);
      setGuards(guardReturn);
      setIsAllowed(false);

      let allowed = false;
      for (const guard of guardReturn) {
        if (guard.allowed) {
          allowed = true;
          break;
        }
      }

      setIsAllowed(allowed);
      setLoading(false);
    };

    checkEligibilityFunc();
    // On purpose: not check for candyMachine, candyGuard, solanaTime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umi, checkEligibility, firstRun]);

  const { buttonGuardList } = useButtonList({
    guardList: guards,
    candyMachine: candyMachine,
    candyGuard: candyGuard,
  });

  const buttonGuardMap: Record<string, GuardButtonList> = {};

  buttonGuardList.forEach((item) => {
    buttonGuardMap[item.label] = item;
  });

  const buttonGuard = buttonGuardMap["public"];
  const mint = () =>
    mintClick(
      umi,
      buttonGuard,
      candyMachine!,
      candyGuard!,
      ownedTokens ?? [],
      1,
      mintsCreated,
      setMintsCreated,
      guards,
      setGuards,
      onShowNftOpen,
      setCheckEligibility
    );

  return (
    <Container maxW={CONTAINER_MAX_WIDTH} pb={"40px"}>
      {loading ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            size="xl"
            color={"#F2C94C"}
            mt={"100px"}
          />
        </>
      ) : (
        <HStack spacing={"20px"} wrap={"wrap"} justify={"center"} py={"2rem"}>
          <MarketCard
            label="Total Glimbi NFT"
            amount={Number(candyMachine?.data.itemsAvailable)}
          />
          <MarketCard
            label="Minted Glimbi NFT"
            amount={Number(candyMachine?.itemsRedeemed)}
          />
          <MarketCard
            label="Available Glimbi NFT"
            amount={
              Number(candyMachine?.data.itemsAvailable) -
              Number(candyMachine?.itemsRedeemed) -
              (mintsCreated?.length ?? 0)
            }
          />
          {/* <MarketCard label="Owners" amount={20} /> */}
          {/* <MarketCard label="Volume" amount={120.32} imageUrl="/ui/token.png" /> */}
        </HStack>
      )}
      {buttonGuard && (
        <Center>
          <HStack py={"100px"} align={"start"} spacing={10}>
            {/* <MarketFilter /> */}
            <NFTS
              mint={mint}
              isAllowed={isAllowed}
              isLoading={
                guards.find((elem) => elem.label === buttonGuard.label)
                  ?.minting ?? false
              }
            />
          </HStack>
        </Center>
      )}

      <Modal size={"lg"} isOpen={isShowNftOpen} onClose={onShowNftClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.900"}>
          <ModalHeader>Your minted NFT:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ShowNft nfts={mintsCreated} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
