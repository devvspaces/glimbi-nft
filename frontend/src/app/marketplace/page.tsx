import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
//   Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiChevronLeftCircle } from "react-icons/bi";

// function NftCard() {
//     return (
//         <VStack>
//             <Box>
//                 <Image src="/ui/sample-nft.png"  alt="NFT image" />
//             </Box>
//             <VStack>
//                 <Text fontSize={"20px"}>NFT Title</Text>
//                 <Heading fontSize={"16px"} fontWeight={'400'}>Owner</Heading>
//                 <Text fontSize={"16px"}>Price</Text>
//             </VStack>
//         </VStack>
//     )
// }

export default function Home() {
  return (
    <VStack pb={"120px"} spacing={"40px"}>
      <Container>
        <HStack justify={"space-between"} py={"40px"}>
          <HStack>
            <IconButton icon={<BiChevronLeftCircle />} aria-label="Back" />
            <Heading fontWeight={"400"} fontSize={"16px"}>
              Marketplace
            </Heading>
          </HStack>
          <Image
            cursor={"pointer"}
            alt="Connect wallet"
            src="/ui/connect-wallet.svg"
          />
        </HStack>
      </Container>
      <Container maxW={CONTAINER_MAX_WIDTH} pb={"40px"}>
        <HStack spacing={"20px"} wrap={"wrap"} justify={"center"}>
          <VStack
            maxW={"300px"}
            spacing={"8px"}
            align={"center"}
            justify={"center"}
          >
            <Text fontSize={"20px"}>Total Glimbi NFT</Text>
            <Heading fontSize={"48px"}>10</Heading>
          </VStack>
          <VStack
            maxW={"300px"}
            spacing={"8px"}
            align={"center"}
            justify={"center"}
          >
            <Text fontSize={"20px"}>Owners</Text>
            <Heading fontSize={"48px"}>20</Heading>
          </VStack>
          <VStack
            maxW={"300px"}
            spacing={"8px"}
            align={"center"}
            justify={"center"}
          >
            <Text fontSize={"20px"}>Volume</Text>
            <HStack gap={'4px'} align={"center"}>
              <Image h={"24px"} alt="Token" src="/ui/token.png" />
              <Heading fontSize={"48px"}>120.32</Heading>
            </HStack>
          </VStack>
        </HStack>
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH}>
        <Box>

        </Box>
        <HStack>

        </HStack>
      </Container>
    </VStack>
  );
}
