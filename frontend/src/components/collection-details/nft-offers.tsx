import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const NFTOffers = () => {
  return (
    <Box
      mr={"auto"}
      bg={"#1E1A3F"}
      border={"2px solid #1E1A3F"}
      w={"100%"}
      borderRadius={"3xl"}
      p={"10px"}
    >
      <HStack justify={"space-between"}>
        <Box>
          <Text mr={"auto"} fontSize={"24px"} fontWeight={500}>
            HIGHEST OFFER
          </Text>
          <VStack mr={"auto"}>
            <HStack
              gap={"10px"}
              mr={"auto"}
              alignItems={"center"}
              justify={"center"}
            >
              <Image src={"/ui/token.png"} alt="mint" width={30} height={30} />
              <Text fontWeight={400} fontSize={"30px"} textColor={"white"}>
                4.22
              </Text>
            </HStack>
            <Text
              fontWeight={500}
              fontSize={"20px"}
              mr={"auto"}
              textColor={"#CECCD6"}
            >
              $20.00
            </Text>
            <HStack mr={"auto"} spacing={1} justify={"start"}>
              <Text>by</Text>
              <Text fontSize={"18px"} textColor={"white"}>
                Johndoe
              </Text>
              <Text>(0x7A3b...6D2C)</Text>
            </HStack>
          </VStack>
        </Box>
        <Text textColor={"blue"}>View all</Text>
      </HStack>
    </Box>
  );
};
