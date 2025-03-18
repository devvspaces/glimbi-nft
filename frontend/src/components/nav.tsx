import { irishVariable } from "@/app/fonts";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Box, Button, Container, HStack, Image } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Container maxW={CONTAINER_MAX_WIDTH}>
      <HStack justifyContent={"space-between"} py={'24px'}>
        <Box minW={"150px"}>
          <Image w={"100%"} alt="Logo" src="/logo.svg" />
        </Box>
        <HStack>
          <Button fontWeight={'400'} fontFamily={irishVariable} color={'white'} bg={'transparent !important'}>Marketplace</Button>
          <Button fontWeight={'400'} fontFamily={irishVariable} color={'white'} bg={'transparent !important'}>Game Info</Button>
          <Button fontWeight={'400'} fontFamily={irishVariable} color={'white'} bg={'transparent !important'}>Token</Button>
          <Button fontWeight={'400'} fontFamily={irishVariable} color={'white'} bg={'transparent !important'}>About</Button>
        </HStack>
        <HStack spacing={4}>
          <Button bg={"transparent !important"}>
            <Image
              display={"block"}
              minW={"30px"}
              alt="Volume up"
              src="/ui/vol-up.svg"
            />
          </Button>
          <Image cursor={'pointer'} alt="Buy glimbi" src="/ui/buy-glimbi-nft.svg" />
        </HStack>
      </HStack>
    </Container>
  );
}
