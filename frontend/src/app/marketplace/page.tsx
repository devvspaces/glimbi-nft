import { MarketCard } from "@/components/marketplace/market-card";
import { MarketFilter } from "@/components/marketplace/market-filter";
import { MarketplaceNavbar } from "@/components/marketplace/navbar";
import { NFTS } from "@/components/marketplace/nfts";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Center, Container, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW={CONTAINER_MAX_WIDTH} pb={"40px"}>
      <MarketplaceNavbar />
      <HStack spacing={"20px"} wrap={"wrap"} justify={"center"} py={"150px"}>
        <MarketCard label="Total Glimbi NFT" amount={10} />
        <MarketCard label="Owners" amount={20} />
        <MarketCard label="Volume" amount={120.32} imageUrl="/ui/token.png" />
      </HStack>
      <Center>
        <HStack py={"100px"} align={"start"} spacing={10}>
          <MarketFilter />
          <NFTS />
        </HStack>
      </Center>
    </Container>
  );
}
