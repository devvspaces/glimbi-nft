import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { UserProfile } from "./user-profile";
import { CurrentPrice } from "./current-price";
import { NFTOffers } from "./nft-offers";

interface NFTIdProfileProps {
  nftId: string;
}

export const NFTIdProfile = ({ nftId }: NFTIdProfileProps) => {
  return (
    <Box w={"100%"} maxW={"449px"} py={"20px"} bg={"black"} px={"10px"}>
      <Box mb={5}>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>
      <VStack spacing={3}>
        <Text mr={"auto"} fontSize={{ base: "24px", sm: "32px" }}>
          Glimbi Cart
        </Text>
        <HStack mr={"auto"}>
          <Image src="/nft-bottle.svg" alt="bottle" h={30} w={30} />
          <Text fontWeight={400} fontSize={"28px"} textColor={"white"}>
            {nftId}
          </Text>
        </HStack>
        <UserProfile />
        <CurrentPrice />
        <NFTOffers />
      </VStack>
    </Box>
  );
};
