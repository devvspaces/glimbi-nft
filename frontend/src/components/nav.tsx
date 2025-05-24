"use client";
import { irishVariable } from "@/app/fonts";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Box, Button, Container, HStack, Image } from "@chakra-ui/react";
import { MenuIcon } from "lucide-react";
import { Link } from "@chakra-ui/next-js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Game Info",
    href: "/gameplay",
  },
  {
    label: "Token",
    href: "/token",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"#000000c7"} backdropFilter="blur(10px)">
          <DrawerCloseButton color={"#14112A"} />
          <DrawerBody>
            <VStack align="start" spacing={"2.5rem"} pt={"2rem"}>
              <VStack align="start" spacing="24px">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    textDecoration={"none"}
                    fontWeight={"400"}
                    fontFamily={irishVariable}
                    color={"white"}
                    bg={"transparent !important"}
                    href={link.href}
                    _hover={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Box>
                  <WalletMultiButton />
                </Box>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container maxW={CONTAINER_MAX_WIDTH}>
        <HStack w={"100%"} justify={"space-between"}>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            py={"24px"}
            w={"100%"}
          >
            <Box minW={"150px"}>
              <Image w={"100%"} alt="Logo" src="/logo.svg" />
            </Box>
            <Box display={{ base: "none", lg: "flex" }}>
              <HStack gap={10}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    textDecoration={"none"}
                    fontWeight={"400"}
                    fontFamily={irishVariable}
                    color={"white"}
                    bg={"transparent !important"}
                    href={link.href}
                    _hover={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </HStack>
            </Box>
            <HStack spacing={4} display={{ base: "none", sm: "flex" }}>
              <Box>
                <WalletMultiButton />
              </Box>
              <Button bg={"transparent !important"}>
                <Image
                  display={"block"}
                  minW={"30px"}
                  alt="Volume up"
                  src="/ui/vol-up.svg"
                />
              </Button>
              <Image
                cursor={"pointer"}
                alt="Buy glimbi"
                src="/ui/buy-glimbi-nft.svg"
              />
            </HStack>
          </HStack>
          <IconButton
            rounded={"md"}
            bgImage="linear-gradient(0deg, rgba(250, 250, 250, 0.01) 0%, rgba(250, 250, 250, 0.01) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.01) -33.08%, rgba(255, 255, 255, 0.00) 135.74%) !important"
            bgColor="#14112A"
            display={{ base: "flex", lg: "none" }}
            aria-label=""
            icon={<MenuIcon size={"24px"} color="#F3F3F3" />}
            onClick={onOpen}
          />
        </HStack>
      </Container>
    </>
  );
}
