import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

function GlimbUtil({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <VStack
      spacing={"24px"}
      maxW={"500px"}
      mx={"auto"}
      textAlign={"center"}
      bgImage={"/ui/util-card-bg.svg"}
      bgRepeat={"no-repeat"}
      bgSize={"contain"}
      bgPosition={"center"}
      py={"60px"}
      px={"30px"}
    >
      <Image h={"80px"} alt="Glimb Utility" src="/ui/token.png" />
      <VStack>
        <Heading fontSize={"36px"} fontWeight={"400"}>
          {title}
        </Heading>
        <Text fontSize={"24px"}>{description}</Text>
      </VStack>
    </VStack>
  );
}

const utilities = [
  {
    title: "In-game Currency",
    description:
      "GLIMB is used to unlock special features, purchase items, land, and NFTs in the GLIMBI Tales Marketplace.",
  },
  {
    title: "Play-to-Earn",
    description:
      "Players can earn GLIMB through gameplay, crafting, farming, and competing in battles.",
  },
  {
    title: "Marketplace Transactions",
    description:
      "GLIMB is the primary payment method for buying exclusive in-game assets.",
  },
  {
    title: "Unlocking Rewards",
    description:
      "GLIMB enables access to special rewards and exclusive content.",
  },
  {
    title: "Breeding System",
    description:
      "GLIMB is used to breed new and unique Glimbis through dark alchemy, creating powerful new mages for players.",
  },
  {
    title: "Crafting",
    description:
      "GLIMB is used to craft rare items, potions, and upgrades that enhance gameplay and provide strategic advantages.",
  },
  {
    title: "Governance",
    description:
      "GLIMB may be used for voting on key decisions, helping shape the future of the GLIMBI Tales universe.",
  },
  {
    title: "Staking",
    description:
      "Players can stake GLIMB tokens to earn passive rewards and bonuses, contributing to the in-game economy.",
  },
  {
    title: "Event Participation",
    description:
      "GLIMB may be used to enter special events, tournaments, and limited-time challenges for exclusive rewards.",
  },
  {
    title: "Access to Exclusive Content",
    description:
      "Players can use GLIMB to unlock hidden areas, characters, and storylines, expanding the world of GLIMBI Tales.",
  },
];

export default function Token() {
  return (
    <main>
      {/* Hero */}
      <Container maxW={CONTAINER_MAX_WIDTH} pt={"200px"} pb={"300px"}>
        <Image
          display={"block"}
          mx={"auto"}
          alt="Team hero"
          src="/ui/token-hero.svg"
        />
      </Container>

      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"} pb={"240px"}>
        <VStack spacing={"40px"} maxW={"1000px"} mx={"auto"}>
          <Image h={"160px"} alt="Token" src="/ui/token.png" />
          <Image h={"80px"} alt="Token" src="/ui/glimb-token-head.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            GLIMB is the native token of the GLIMBI Tales ecosystem, powering
            in-game activities and rewards. It facilitates purchases, unlocks
            special features, and supports customization in gameplay. GLIMB will
            also serve as the primary payment method in our GLIMBI Tales
            Marketplace, enabling players to buy exclusive NFTs, items, and
            land. As the game grows, GLIMB will continue to provide exclusive
            access to future opportunities, content, and rewards, enhancing both
            the player experience and the overall GLIMBI Tales universe
          </Text>
        </VStack>
      </Container>

      <Container
        backgroundAttachment={"fixed"}
        bgImage={"/ui/util-large-bg.png"}
        pos={"relative"}
        maxW={"none"}
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
          src="/ui/glimb-token-util-head.svg"
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

        <HStack
          spacing={"40px"}
          justify={"center"}
          mx={"auto"}
          wrap={"wrap"}
          pos={"relative"}
          zIndex={2}
          maxW={"1200px"}
        >
          {utilities.map((util) => (
            <GlimbUtil
              key={util.title}
              title={util.title}
              description={util.description}
            />
          ))}
        </HStack>

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
          <Image h={"160px"} alt="Token" src="/ui/token.png" />
          <Image h={"80px"} alt="About" src="/ui/token-soon.svg" />
          <Text textAlign={"center"} fontSize={"24px"}>
            The GLIMB token will be available for purchase on various exchanges
            in the future, including Binance, KuCoin, Coinstore, and
            PancakeSwap. However, it is not yet available for purchase at this
            time. Stay tuned for further updates on its availability!
          </Text>
        </VStack>
      </Container>
    </main>
  );
}
