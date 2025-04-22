"use client";
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
      maxW={"264px"}
      h={"382px"}
      border={"2px solid #CECCD6"}
      borderRadius={"3xl"}
      p={"1px"}
      overflow={"hidden"}
      cursor={'pointer'}
    >
      <Box bgColor={"#111000"} h={"100%"}>
        <Box h={"100%"} w={"100%"} p={"2rem 1rem"}>
          <VStack h={"100%"}>
            <Image h={"280px"} src={imageUrl} alt={label} />
            <HStack bg="#4E4E4E" p={"5px"} borderRadius={"full"} mr={"auto"}>
              <Image src="/nft-bottle.svg" alt="bottle" h={"12px"} w={"12px"} />
              <Text fontWeight={400} fontSize={"15px"}>
                {id}
              </Text>
            </HStack>
            <Text fontSize={"16px"} fontWeight={400} mr={"auto"}>
              {label}
            </Text>
            <HStack
              gap={"10px"}
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
              <Text fontWeight={400} fontSize={"20px"}>
                {rating}
              </Text>
              <Text fontWeight={500} fontSize={"18px"} textColor={"#CECCD6"}>
                ${price.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
