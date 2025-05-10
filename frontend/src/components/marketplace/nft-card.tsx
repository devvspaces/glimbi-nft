"use client";
import { aldrichVariable } from "@/app/fonts";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
interface NftCardProps {
  imageUrl: string;
  id: string;
  price: number;
  label: string;
  rating: number;
}

export const NftCard = ({
  imageUrl,
  label,
  price,
  rating,
  id,
}: NftCardProps) => {
  const router = useRouter();

  return (
    <Box
      w={"100%"}
      onClick={() => router.push(`/marketplace/${id}`)}
      maxW={"300px"}
      border={"2px solid #CECCD6"}
      borderRadius={"3xl"}
      p={"1px"}
      overflow={"hidden"}
      cursor={"pointer"}
    >
      <Box bgColor={"#111000"} h={"100%"}>
        <Box h={"100%"} w={"100%"}>
          <VStack h={"100%"} bg={"#14112A"}>
            <Image h={"280px"} src={imageUrl} alt={label} />
            <VStack spacing={"8px"} p={"1rem"} bg={"#090A1F"} w={"100%"}>
              <HStack
                bg="#4E4E4E"
                align={"center"}
                p={"5px"}
                borderRadius={"full"}
                mr={"auto"}
              >
                <Image
                  src="/nft-bottle.svg"
                  alt="bottle"
                  h={"15px"}
                  w={"15px"}
                />
                <Text
                  fontFamily={aldrichVariable}
                  fontWeight={400}
                  fontSize={"10px"}
                >
                  {id}
                </Text>
              </HStack>
              <Text fontSize={"1.3rem"} fontWeight={400} mr={"auto"}>
                {label}
              </Text>
              <HStack
                gap={"8px"}
                mr={"auto"}
                align={"center"}
                justify={"center"}
              >
                <Image
                  src={"/ui/token.png"}
                  alt="mint"
                  width={"20px"}
                  height={"20px"}
                />
                <Text fontWeight={700} fontSize={"1.1rem"}>
                  {rating}
                </Text>
                <Text
                  fontWeight={500}
                  fontFamily={aldrichVariable}
                  fontSize={".9rem"}
                  textColor={"#CECCD6"}
                  ml={'1rem'}
                >
                  ${price.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
