import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface MarketCardProps {
  label: string;
  amount: number;
  imageUrl?: string;
}

export const MarketCard = ({ label, amount, imageUrl }: MarketCardProps) => {
  return (
    <Box
      w={"100%"}
      maxW={"250px"}
      border={"2px"}
      p={"5px"}
      borderRadius={"2xl"}
      borderColor={"#CECCD6"}
    >
      <VStack spacing={"8px"} align={"center"} justify={"center"}>
        <Text fontSize={"20px"}>{label}</Text>
        <HStack gap={5}>
          {imageUrl && <Image h={"24px"} src={imageUrl} alt={label} />}
          <Heading fontSize={"48px"}>{amount}</Heading>
        </HStack>
      </VStack>
    </Box>
  );
};
