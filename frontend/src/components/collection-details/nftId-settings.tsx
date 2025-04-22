import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { NftSelect } from "./nft-select";
import { TraitCard } from "./trait-card";

export const NFTIdSettings = () => {
  return (
    <Box bg={"#1E1A3F"}  w="100%" maxW={"800px"}>
      <VStack width={"100%"}>
        <TraitCard />
        <NftSelect />
      </VStack>
    </Box>
  );
};
