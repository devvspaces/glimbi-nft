import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { TraitCard } from "./trait-card";

export const NFTIdSettings = () => {
  return (
    <Box  w="100%" maxW={"800px"}>
      <VStack width={"100%"}>
        <TraitCard />
      </VStack>
    </Box>
  );
};
