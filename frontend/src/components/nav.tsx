import { irishVariable } from "@/app/fonts";
import { Link } from "@chakra-ui/react";
import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Box, Button, Container, HStack, Image } from "@chakra-ui/react";

const navLinks = [
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
  return (
    <Container maxW={CONTAINER_MAX_WIDTH}>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"24px"}
      >
        <Box minW={"150px"}>
          <Image w={"100%"} alt="Logo" src="/logo.svg" />
        </Box>
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
        <HStack spacing={4}>
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
    </Container>
  );
}
