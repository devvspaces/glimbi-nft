import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { UserProfile } from "./user-profile";
import { CurrentPrice } from "./current-price";
import { NFTOffers } from "./nft-offers";
import { aldrichVariable } from "@/app/fonts";

interface NFTIdProfileProps {
  nftId: string;
}

export const NFTIdProfile = ({ nftId }: NFTIdProfileProps) => {
  return (
    <Stack
      w={"100%"}
      maxW={"500px"}
      bg={"#14112A"}
      rounded={"20px"}
      border={"1px solid #393275"}
      p={"24px"}
      gap={"24px"}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image w={"80%"} alt="Gameplay" src="/Sniper 3.svg" />
      </Box>
      <Stack gap={"8px"}>
        <Heading fontSize={"2rem"} color={"white"}>
          Glimbi Cart
        </Heading>
        <HStack
          w={"fit-content"}
          p={"2px 8px"}
          rounded={"full"}
          bg={"#1E1A3F"}
          gap={"4px"}
        >
          <Image src="/nft-bottle.svg" alt="bottle" h={"15px"} w={"15px"} />
          <Text
            fontFamily={aldrichVariable}
            fontWeight={400}
            fontSize={"12px"}
            textColor={"white"}
          >
            {nftId}
          </Text>
        </HStack>
      </Stack>
      <UserProfile />
      <CurrentPrice />
      <HStack
        flexWrap={'wrap'}
        justify={'space-between'}
        align={"center"}
        spacing={'20px'}
      >
        <Image w={'45%'} cursor={"pointer"} alt="Connect wallet" src="/ui/buy-now.svg" />
        <Image
         w={'45%'}
          cursor={"pointer"}
          alt="Connect wallet"
          src="/ui/make-offer.svg"
        />
      </HStack>
      <NFTOffers />
    </Stack>
  );
};
