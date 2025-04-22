import { SimpleGrid } from "@chakra-ui/react";
import { NftCard } from "./nft-card";

const nfts = [
  {
    imageUrl: "/Sniper 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Shadow 1.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Poison 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Magic 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Light 1.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Electric 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/ICE 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Fire 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Dean 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    imageUrl: "/Stone 3.svg",
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
