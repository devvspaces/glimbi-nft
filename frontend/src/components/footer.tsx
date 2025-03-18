import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaXTwitter, FaDiscord, FaInstagram } from "react-icons/fa6";


export function Footer() {
    return (
        <Container maxW={"none"} py={"80px"} border={"8px solid #3D2C8D"} px={0}>
        <VStack gap={"40px"} textAlign={"center"} mx={"72px"}>
          <Image h={"50px"} alt="Gameplay" src="/ui/divider.svg" />

          <HStack justify={"space-between"} w={"100%"}>
            <VStack align={"start"} gap={"24px"}>
              <Box minW={"150px"}>
                <Image w={"100%"} alt="Logo" src="/logo.svg" />
              </Box>
              <HStack opacity={".5"} gap={"24px"}>
                <VStack align={"start"}>
                  <Link href="#">Game Features</Link>
                  <Link href="#">Glimbi</Link>
                  <Link href="#">Token</Link>
                </VStack>
                <VStack align={"start"}>
                  <Link href="#">Marketplace</Link>
                  <Link href="#">Litepaper</Link>
                  <Link href="#">About</Link>
                </VStack>
              </HStack>
            </VStack>
            <VStack align={"end"} gap={"24px"}>
              <HStack gap={"24px"}>
                <Input
                  rounded={"2rem"}
                  border={"none !important"}
                  outline={"none !important"}
                  boxShadow={"none !important"}
                  bg={"#403D58"}
                  placeholder="Email Address"
                  color={'white'}
                  fontSize={"14px"}
                  w={"300px"}
                />
                <Image
                  cursor={"pointer"}
                  alt="Buy glimbi"
                  src="/ui/subscribe-btn.svg"
                />
              </HStack>
              <HStack fontSize={"30px"} gap={"20px"}>
                <Link
                  opacity={0.5}
                  transition={".3s"}
                  _hover={{
                    opacity: 1,
                  }}
                  href="https://twitter.com/glimbitales"
                  isExternal
                >
                  <FaXTwitter />
                </Link>

                <Link
                  opacity={0.5}
                  transition={".3s"}
                  _hover={{
                    opacity: 1,
                  }}
                  href="https://twitter.com/glimbitales"
                  isExternal
                >
                  <FaDiscord />
                </Link>

                <Link
                  opacity={0.5}
                  transition={".3s"}
                  _hover={{
                    opacity: 1,
                  }}
                  href="https://twitter.com/glimbitales"
                  isExternal
                >
                  <FaInstagram />
                </Link>
              </HStack>
            </VStack>
          </HStack>

          <Image h={"50px"} alt="Gameplay" src="/ui/divider.svg" />

          <HStack w={"100%"} justify={"space-between"}>
            <Text opacity={'.5'}>© 2025 — Copyright</Text>
            <HStack opacity={'.5'}>
              <Link href="#">Privacy Policy</Link>
              <Text> | </Text>
              <Link href="#">Terms of Service</Link>
            </HStack>
            <Button bg={"transparent !important"}>
              <Image
                display={"block"}
                minW={"30px"}
                alt="Go up"
                src="/ui/go-up.svg"
              />
            </Button>
          </HStack>
        </VStack>
      </Container>
    )
}