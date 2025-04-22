import { NFTIdNavbar } from "@/components/collection-details/nftId-navbar";
import { NFTIdProfile } from "@/components/collection-details/nftId-profile";
import { NFTIdSettings } from "@/components/collection-details/nftId-settings";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Center, Container, Stack } from "@chakra-ui/react";
interface PageProps {
  params: Promise<{ nftId: string }>;
}

const NFTDetailsPage = async ({ params }: PageProps) => {
  const { nftId } = await params;
  return (
    <Container maxW={CONTAINER_MAX_WIDTH}>
      <NFTIdNavbar nftId={nftId} />
      <Center alignItems={"start"} gap={10} py={"100px"}>
        <Stack
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-start" }}
          justify={"center"}
          gap={10}
          py="100px"
          width={"100%"}
        >
          <NFTIdSettings />
          <NFTIdProfile nftId={nftId} />
        </Stack>
      </Center>
    </Container>
  );
};

export default NFTDetailsPage;
