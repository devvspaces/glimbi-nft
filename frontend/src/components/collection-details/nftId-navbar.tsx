"use client";
import { Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface NFTIdNavbarProps {
  nftId: string;
}

export const NFTIdNavbar = ({ nftId }: NFTIdNavbarProps) => {
  const router = useRouter();
  return (
    <HStack justify={"space-between"} py={"40px"} w={"100%"}>
      <HStack
        align={"center"}
        onClick={() => router.push("/marketplace")}
        cursor={"pointer"}
      >
        <IconButton
          bg="transparent"
          border="2px solid gray"
          borderRadius="full"
          color={'white'}
          p={2}
          fontSize={"50px"}
          icon={<ChevronLeft size={25} fill="gray" />}
          aria-label="Back"
        />
        <Heading fontWeight={"400"} fontSize={"16px"}>
          Marketplace
        </Heading>
        <Text fontWeight={800} fontSize={"20px"} textColor={"white"}>
          /{nftId}
        </Text>
      </HStack>
      <Image
        cursor={"pointer"}
        alt="Connect wallet"
        src="/ui/connect-btn.svg"
      />
    </HStack>
  );
};
