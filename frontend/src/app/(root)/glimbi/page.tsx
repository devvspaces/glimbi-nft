import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Glimbi() {
  return (
    <main>
      {/* Hero */}
      <Container maxW={CONTAINER_MAX_WIDTH} pt={"200px"} pb={"300px"}>
        <Image
          display={"block"}
          mx={"auto"}
          alt="Team hero"
          src="/ui/glimbi-hero.svg"
        />
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"80px"}>
          <VStack spacing={"40px"} maxW={"1000px"}>
            <Image h={"80px"} alt="About" src="/ui/what-are-glimbi-head.svg" />
            <Text textAlign={"center"} fontSize={"24px"}>
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

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack>
          <Image
            h={"80px"}
            alt="Glimbi Body"
            src="/ui/glimbi-body-parts-head.svg"
          />
          <Box>
            <Image w={"100%"} src="/ui/glimbi-body.svg" alt="Glimbi body" />
          </Box>
        </VStack>
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"} pb={"240px"}>
        <HStack spacing={"40px"} justifyContent={"center"}>
          <Box w={"100%"} maxW={"800px"}>
            <Image
              objectFit={"cover"}
              w={"100%"}
              h={"700px"}
              alt="Gameplay"
              src="/ui/white-bg.svg"
            />
          </Box>
          <VStack maxW={"500px"} align={"start"} spacing={"16px"}>
            <Heading fontSize={"36px"}>
              {"Harness Your Glimbi's Power in the Game"}
            </Heading>
            <Text fontSize={"24px"}>
              Your Glimbi is not just a mage—it’s a key to unlocking the world
              of GLIMBI Tales. Use their unique magical powers to gather rare
              resources, grow enchanted crops, and battle dark forces that
              threaten the land. Each Glimbi brings its own special abilities to
              the table, helping you uncover hidden secrets, defeat powerful
              enemies, and earn valuable rewards as you progress through the
              game. The stronger your Glimbi, the greater your chances of
              restoring balance to the cursed lands.
            </Text>
          </VStack>
        </HStack>
      </Container>

      <Container
        backgroundAttachment={"fixed"}
        bgImage={"/ui/tier-bg-large.png"}
        pos={"relative"}
        maxW={'none'}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        bgPosition={"center"}
        p={"0px"}
      >
          <Image
            pos={"relative"}
            zIndex={1}
            h={"80px"}
            alt="Breeding"
            src="/ui/breeding-head.svg"
            mb={"200px"}
            display={"block"}
            mx={"auto"}
          />
          <Image
            pos={"absolute"}
            top={0}
            left={0}
            w={"100%"}
            alt="Top"
            src="/ui/tier-bg-top.svg"
          />
          <Image
            pos={"relative"}
            zIndex={1}
            w={"100%"}
            maxW={"1000px"}
            alt="tier"
            src="/ui/tiers.svg"
            display={"block"}
            mx={"auto"}
          />
          <Image
            pos={"absolute"}
            bottom={0}
            left={0}
            w={"100%"}
            alt="Bottom"
            src="/ui/tier-bg-bottom.svg"
          />
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"} pt={"240px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"80px"} alt="About" src="/ui/buy-a-glimbi-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            The rarest Glimbi NFTs are limited edition, featuring exclusive
            traits and magical abilities that make them stand out. This
            collection includes unique Glimbis with special powers, offering
            players an advantage in the game. These limited edition NFTs, along
            with other rare items, will be available for purchase in our GLIMBI
            Tales Marketplace in the future, allowing you to expand your
            collection and enhance your gameplay experience.
          </Text>
          <Image cursor={"pointer"} alt="Explore" src="/ui/explore-btn.svg" />
        </VStack>
      </Container>
    </main>
  );
}
