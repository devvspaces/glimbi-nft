import { aldrichVariable, irishVariable } from "@/app/fonts";
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const NFTOffers = () => {
  return (
    <Box
      bg={"#1E1A3F"}
      w={"100%"}
      borderRadius={"2xl"}
      p={"16px"}
      border={"1px solid #393275"}
    >
      <HStack justify={"space-between"} align={"center"} flexWrap={"wrap"}>
        <Stack gap={"8px"}>
          <Text
            mr={"auto"}
            fontSize={"1rem"}
            fontWeight={500}
            fontFamily={aldrichVariable}
          >
            HIGHEST OFFER
          </Text>
          <Stack>
            <HStack gap={"10px"} alignItems={"center"}>
              <Image src={"/ui/token.png"} alt="mint" width={30} height={30} />
              <Text
                fontFamily={irishVariable}
                fontWeight={400}
                fontSize={"1.2rem"}
                textColor={"white"}
              >
                4.22
              </Text>
            </HStack>
            <Text
              fontWeight={500}
              fontSize={"12px"}
              textColor={"#CECCD6"}
              fontFamily={aldrichVariable}
              lineHeight={"160%"}
            >
              $20.00
            </Text>
            <HStack spacing={1} alignItems={"center"}>
              <Text
                fontFamily={aldrichVariable}
                fontSize={"12px"}
                textColor={"#CECCD6"}
              >
                by
              </Text>
              <Text fontSize={"14px"} textColor={"white"}>
                Johndoe
              </Text>
              <Text
                fontSize={"12px"}
                textColor={"#CECCD6"}
                fontFamily={aldrichVariable}
              >
                (0x7A3b...6D2C)
              </Text>
            </HStack>
          </Stack>
        </Stack>
        <Text textColor={"blue"}>View all</Text>
      </HStack>
    </Box>
  );
};
