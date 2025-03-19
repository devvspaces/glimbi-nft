import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Box,
  Container,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <Container maxW={CONTAINER_MAX_WIDTH} pt={"200px"} pb={"300px"}>
        <Image
          display={"block"}
          mx={"auto"}
          alt="Team hero"
          src="/ui/gameplay-hero.svg"
        />
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/farming-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Cultivate shadow-touched crops infused with dark magic, yielding
            rare resources essential for crafting powerful items and upgrading
            your Glimbi mages. Manage your farm to produce unique materials,
            which will prepare you for battles and exploration.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/exploring-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Journey across the cursed lands, uncovering ancient secrets, lost
            artifacts, and hidden treasures. Navigate through treacherous
            terrains and face challenges while gathering rare resources to aid
            your Glimbis in their quest.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/pve-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Enter perilous dungeons filled with monstrous foes and enigmatic
            puzzles. Use your Glimbi’s magical abilities to overcome challenges,
            defeat powerful enemies, and reap valuable rewards for your
            progression.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/one-v-one-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Challenge other players in real-time competitive tower defense
            battles. Strategize, deploy defenses, and test your skills to outwit
            opponents and earn coveted rewards, proving your dominance in the
            GLIMBI world.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/breeding-system-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Combine traits, magical powers, and body parts to create entirely
            unique Glimbi mages. Experiment with endless possibilities to
            develop powerful characters tailored to your gameplay strategies and
            expand your collection.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/land-gameplay-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Claim ownership of cursed lands and transform them into thriving
            hubs. Customize your land to grow resources, construct magical
            structures, and increase your influence in the GLIMBI universe.
            Landowners unlock exclusive  benefits and opportunities.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/crafting-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            Utilize collected resources to forge exceptional artifacts, magical
            weapons, and game-changing tools. Craft upgrades to enhance your
            Glimbis and refine your strategic edge in battles, exploration, and
            farming activities.
          </Text>
        </VStack>
      </Container>
      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"40px"}>
          <HStack justify={"center"} gap={0}>
            <Image
              w={"300px"}
              h={"400px"}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start1.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={"300px"}
              h={"400px"}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start2.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={"300px"}
              h={"400px"}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start3.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
            <Image
              w={"300px"}
              h={"400px"}
              objectFit={"cover"}
              alt="Each glimbi"
              src="/ui/free-to-start4.svg"
              boxShadow={"0 0 98px 80px #1E1A3F inset"}
            />
          </HStack>
          <Image h={"80px"} alt="Gameplay" src="/ui/free-to-start-head.svg" />
          <Text fontSize={"24px"} textAlign={"center"} maxW={"1000px"}>
            GLIMBI Tales is free to start, letting players explore, farm, and
            battle without initial investment. While the game is accessible to
            all, players can purchase unique Glimbis (NFTs) and other items for
            enhanced customization and play-to-earn rewards.
          </Text>
        </VStack>
      </Container>
    </main>
  );
}
