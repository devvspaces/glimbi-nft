import { SimpleGrid } from "@chakra-ui/react";
import { NftCard } from "./nft-card";

const nfts = [
  {
    id: "47673899",
    imageUrl: "/Sniper 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
];

export const NFTS = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {nfts.map((item, index) => (
        <NftCard key={index} {...item} />
      ))}
    </SimpleGrid>
  );
};
