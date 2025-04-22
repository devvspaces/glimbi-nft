import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaXTwitter, FaDiscord, FaInstagram } from "react-icons/fa6";

export function Footer() {
  return (
    <Container maxW="none" py="80px" border="8px solid #3D2C8D" px={0}>
      <VStack gap="40px" textAlign="center" px={{ base: "24px", md: "72px" }}>
        <Image h="50px" alt="Gameplay" src="/ui/divider.svg" />

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          w="100%"
          spacing="40px"
        >
          {/* Left Side */}
          <VStack align="start" gap="24px" w="full">
            <Box minW="150px">
              <Image w="100%" alt="Logo" src="/logo.svg" />
            </Box>
            <HStack opacity=".5" gap="24px" align="start" wrap="wrap">
              <VStack align="start">
                <Link href="/gameplay">Game Features</Link>
                <Link href="/glimbi">Glimbi</Link>
                <Link href="/token">Token</Link>
              </VStack>
              <VStack align="start">
                <Link href="/marketplace">Marketplace</Link>
                <Link href="/litepaper">Litepaper</Link>
                <Link href="/about">About</Link>
              </VStack>
            </HStack>
          </VStack>

          {/* Right Side */}
          <VStack align={{ base: "start", md: "end" }} gap="24px" w="full">
            <Stack
              direction={{ base: "column", sm: "row" }}
              gap="16px"
              align="center"
            >
              <Input
                rounded="2rem"
                border="none"
                outline="none"
                boxShadow="none"
                bg="#403D58"
                placeholder="Email Address"
                color="white"
                fontSize="14px"
                w={{ base: "100%", sm: "300px" }}
              />
              <Image
                cursor="pointer"
                alt="Buy glimbi"
                src="/ui/subscribe-btn.svg"
              />
            </Stack>
            <HStack fontSize="30px" gap="20px">
              <Link
                opacity={0.5}
                transition=".3s"
                _hover={{ opacity: 1 }}
                href="https://twitter.com/glimbitales"
                isExternal
              >
                <FaXTwitter />
              </Link>
              <Link
                opacity={0.5}
                transition=".3s"
                _hover={{ opacity: 1 }}
                href="https://twitter.com/glimbitales"
                isExternal
              >
                <FaDiscord />
              </Link>
              <Link
                opacity={0.5}
                transition=".3s"
                _hover={{ opacity: 1 }}
                href="https://twitter.com/glimbitales"
                isExternal
              >
                <FaInstagram />
              </Link>
            </HStack>
          </VStack>
        </Stack>

        <Image h="50px" alt="Gameplay" src="/ui/divider.svg" />

        <Flex
          direction={{ base: "column", md: "row" }}
          w="100%"
          justify="space-between"
          align="center"
          gap="16px"
        >
          <Text opacity=".5">© 2025 — Copyright</Text>
          <HStack opacity=".5">
            <Link href="#">Privacy Policy</Link>
            <Text> | </Text>
            <Link href="#">Terms of Service</Link>
          </HStack>
          <Button bg="transparent">
            <Image
              display="block"
              minW="30px"
              alt="Go up"
              src="/ui/go-up.svg"
            />
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
}
