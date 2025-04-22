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
  {
    id: "776658",

    imageUrl: "/Shadow 1.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "4111999",

    imageUrl: "/Poison 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "478899",

    imageUrl: "/Magic 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "10009999",

    imageUrl: "/Light 1.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "5598899",

    imageUrl: "/Electric 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "1001899",

    imageUrl: "/ICE 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "9976899",

    imageUrl: "/Fire 3.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "1761899",

    imageUrl: "/Dean 2.svg",
    label: "Glimbi Cart",
    coin: 2000087,
    price: 40,
    rating: 4.5,
  },
  {
    id: "4907899",
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
