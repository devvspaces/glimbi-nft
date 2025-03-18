import { CONTAINER_MAX_WIDTH } from "@/helper/constants";
import { Box, Container, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";

function TeamCard() {
  return (
    <VStack gap={"16px"}>
      <Box
        bgImage={"/ui/member-card.svg"}
        bgSize={"cover"}
        w={"300px"}
        h={"300px"}
      ></Box>
      <VStack gap={"8px"}>
        <Heading fontWeight={"400"} fontSize={"24px"}>
          John Doe
        </Heading>
        <Text fontSize={"24px"}>Developer</Text>
      </VStack>
    </VStack>
  );
}

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <Container maxW={CONTAINER_MAX_WIDTH} pt={"200px"} pb={"300px"}>
        <Image
          display={"block"}
          mx={"auto"}
          alt="Team hero"
          src="/ui/team-hero-text.svg"
        />
      </Container>

      {/* About*/}
      <Container maxW={CONTAINER_MAX_WIDTH} py={"120px"}>
        <VStack spacing={"48px"}>
          <Image h={"80px"} alt="About" src="/ui/meet-the-team.svg" />
          <HStack spacing={"40px"} justify={"center"} wrap={"wrap"}>
            {Array.from({ length: 10 }).map((_, index) => (
              <TeamCard key={index} />
            ))}
          </HStack>
        </VStack>
      </Container>

      <Box>
        <Image w={"100%"} alt="Gameplay" src="/ui/white-bg.svg" />
      </Box>
    </main>
  );
}
