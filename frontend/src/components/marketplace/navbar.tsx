"use client";
import { Heading, HStack, IconButton, Image } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export const MarketplaceNavbar = () => {
  const router = useRouter();
  return (
    <HStack justify={"space-between"} py={"40px"} w={"100%"}>
      <HStack
        align={"center"}
        onClick={() => router.push("/")}
        cursor={"pointer"}
      >
        <IconButton
          bg="transparent"
          border="2px solid gray"
          borderRadius="full"
          p={2}
          fontSize={"50px"}
          icon={<ChevronLeft size={25} fill="gray" />}
          aria-label="Back"
        />
        <Heading fontWeight={"400"} fontSize={"16px"} display={{base: "none", sm:'flex'}}>
          Marketplace
        </Heading>
      </HStack>
      <Image
        cursor={"pointer"}
        alt="Connect wallet"
        src="/ui/connect-btn.svg"
      />
    </HStack>
  );
};
