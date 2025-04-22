import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaXTwitter, FaDiscord, FaInstagram } from "react-icons/fa6";

function Gameplay({
  title,
  content,
  reverse = false,
}: {
  title: string;
  content: string;
  reverse?: boolean;
}) {
  return (
    <Stack
      spacing={{ base: "40px", md: "80px" }}
      direction={{ base: "column", md: reverse ? "row-reverse" : "row" }}
      align="center"
    >
      <Box>
        <Image w="100%" alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>
      <VStack align="start" spacing="16px">
        <Heading fontSize={{ base: "28px", md: "36px" }}>{title}</Heading>
        <Text fontSize={{ base: "18px", md: "24px" }}>{content}</Text>
      </VStack>
    </Stack>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Container
        maxW={CONTAINER_MAX_WIDTH}
        h={{ base: "50px", md: "500px", lg: "700px" }}
      />

      {/* About*/}
      <Container
        maxW={CONTAINER_MAX_WIDTH}
        py={{ base: "60px", md: "120px" }}
        px={{ base: "10px", sm: "140px" }}
      >
        <VStack spacing={"40px"}>
          <Image h={"80px"} alt="About" src="/ui/about-head.png" />
          <Text textAlign="center" fontSize={{ base: "18px", md: "24px" }}>
            GLIMBI Tales is a Web3 game where players transform into powerful
            mages, exploring cursed lands, battling creatures, and uncovering
            ancient mysteries. With unique NFTs, land ownership, farming, 1v1
            battles, and Play-to-Earn features, it blends immersive gameplay
            with blockchain technology to provide players with true ownership
            and limitless opportunities. Join the adventure and shape the future
            of GLIMBI!
          </Text>
        </VStack>
      </Container>

      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      {/* Gameplay */}
      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"98px"}>
          <Image h={"80px"} alt="Gameplay" src="/ui/gameplay-head.svg" />

          <VStack spacing={"80px"}>
            <Gameplay
              title="Farming"
              content="Grow shadow-touched crops and gather mystical resources to craft items, strengthen your mages, and prepare for battles."
            />
            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column-reverse", md: "row" }}
              align="center"
            >
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  Exploring
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Venture into cursed lands to uncover secrets, hidden
                  treasures, and rare resources while encountering unexpected
                  challenges.
                </Text>
              </VStack>
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  PVE Dungeons
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Send your Glimbi into dangerous dungeons to battle monsters,
                  solve mysteries, and collect powerful rewards.
                </Text>
              </VStack>
            </Stack>

            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column-reverse", md: "row" }}
              align="center"
            >
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  Land Gameplay
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Own and customize your cursed lands to farm, build, and expand
                  your influence in the GLIMBI world.
                </Text>
              </VStack>
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
            </Stack>

            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  1v1 Tower Defense Mode
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Compete in real-time against other players in strategic tower
                  defense battles to prove your skills and earn rewards.
                </Text>
              </VStack>
            </Stack>

            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column-reverse", md: "row" }}
              align="center"
            >
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  Breeding System
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Create unique mages by combining traits, body parts, and
                  magical abilities to expand your collection and enhance
                  gameplay strategies.
                </Text>
              </VStack>
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
            </Stack>

            <Stack
              spacing={{ base: "40px", md: "80px" }}
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              <Box>
                <Image alt="Gameplay" src="/ui/white-bg.svg" />
              </Box>
              <VStack align="start" spacing="16px">
                <Heading fontSize={{ base: "28px", md: "36px" }}>
                  Crafting
                </Heading>
                <Text fontSize={{ base: "18px", md: "24px" }}>
                  Use collected resources and items to craft powerful artifacts,
                  upgrades, and magical tools to enhance your mages and gameplay
                  strategy.
                </Text>
              </VStack>
            </Stack>
          </VStack>
        </VStack>
      </Container>

      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"80px"}>
          <VStack spacing={"40px"} maxW={"1000px"} textAlign={"center"}>
            <Image
              h={"80px"}
              alt="Gameplay"
              src="/ui/what-are-glimbi-head.svg"
            />
            <Text fontSize={{ base: "18px", md: "24px" }}>
              Glimbis are powerful, unique mages in GLIMBI Tales, created
              through dark alchemy by combining magical traits, body parts, and
              powers. Each Glimbi is one-of-a-kind, with distinct abilities and
              appearances. They are the only ones who can face the curse
              spreading through the lands, exploring dungeons, battling
              monsters, and uncovering secrets to restore balance to the world.
            </Text>
          </VStack>
          <HStack justifyContent={"space-between"} spacing={"40px"}>
            <Box w={"100%"} maxW={"400px"}>
              <Image w={"100%"} alt="Death" src="/ui/death.svg" />
            </Box>
            <Box w={"100%"} maxW={"400px"}>
              <Image w={"100%"} alt="poison" src="/ui/poison.svg" />
            </Box>
            <Box w={"100%"} maxW={"400px"}>
              <Image w={"100%"} alt="volt" src="/ui/volt.svg" />
            </Box>
          </HStack>
        </VStack>
      </Container>

      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={{ base: "50px", md: "120px" }}>
        <VStack spacing={{ base: "20px", md: "40px" }}>
          <HStack
            justify={"center"}
            gap={0}
            spacing={{ base: "10px", md: "20px" }}
            wrap="wrap"
          >
            <Image
              w={{ base: "200px", md: "300px" }}
              h={{ base: "300px", md: "400px" }}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start1.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={{ base: "200px", md: "300px" }}
              h={{ base: "300px", md: "400px" }}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start2.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={{ base: "200px", md: "300px" }}
              h={{ base: "300px", md: "400px" }}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start3.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={{ base: "200px", md: "300px" }}
              h={{ base: "300px", md: "400px" }}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start4.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
          </HStack>

          <Image h={"80px"} alt="Gameplay" src="/ui/free-to-start-head.svg" />

          <Text
            fontSize={{ base: "16px", md: "24px" }}
            textAlign={"center"}
            maxW={"1000px"}
          >
            GLIMBI Tales is free to start, letting players explore, farm, and
            battle without initial investment. While the game is accessible to
            all, players can purchase unique Glimbis (NFTs) and other items for
            enhanced customization and play-to-earn rewards.
          </Text>
        </VStack>
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"250px"}>
        <VStack
          gap={{ base: "16px", md: "24px" }}
          textAlign={"center"}
          maxW={{ base: "90%", md: "700px" }}
          mx={"auto"}
        >
          <Heading fontSize={{ base: "32px", md: "48px" }}>
            Join the GLIMBI Community
          </Heading>
          <Text fontSize={{ base: "16px", md: "24px" }}>
            Connect with fellow players, ask questions, participate in
            competitions, and stay updated on the latest news and events in the
            world of GLIMBI Tales!
          </Text>
          <HStack
            fontSize={{ base: "20px", md: "24px" }}
            justify={"center"}
            gap="16px"
          >
            <Link href="https://twitter.com/glimbitales" isExternal>
              <FaXTwitter />
            </Link>

            <Link href="https://discord.com/glimbitales" isExternal>
              <FaDiscord />
            </Link>

            <Link href="https://instagram.com/glimbitales" isExternal>
              <FaInstagram />
            </Link>
          </HStack>
        </VStack>
      </Container>
    </main>
  );
}
