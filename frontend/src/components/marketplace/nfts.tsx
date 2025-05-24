import { Flex } from "@chakra-ui/react";
import { NftCard } from "./nft-card";

const nfts = [
  {
    id: "Unknown",
    imageUrl: "/Sniper 3.svg",
    label: "Glimbi Tales",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
];

export const NFTS = ({
  mint,
  isLoading,
  isAllowed,
}: {
  mint?: () => void;
  isLoading: boolean;
  isAllowed: boolean;
}) => {
  return (
    <Flex align="center" justify="center" gap={4} wrap="wrap" w="100%">
      {nfts.map((item, index) => (
        <NftCard
          key={index}
          {...item}
          mint={mint}
          isLoading={isLoading}
          isAllowed={isAllowed}
        />
      ))}
    </Flex>
  );
};
