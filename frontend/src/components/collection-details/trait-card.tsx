import {
  Box,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronDown,
  ChevronDownIcon,
  InfoIcon,
  SearchIcon,
} from "lucide-react";

export const TraitCard = () => {
  return (
    <Box width={"100%"} px={"20px"}>
      <HStack
        w={"100%"}
        justify={"space-between"}
        bg={"black"}
        p={{ base: "5px", sm: "20px" }}
      >
        <Text fontSize={"32px"} textColor={"white"}>
          Traits
        </Text>
        <IconButton
          bg="transparent"
          borderRadius="full"
          color={"white"}
          p={2}
          icon={<ChevronDown size={40} />}
          aria-label="select"
        />
      </HStack>
      <Stack direction={{ base: "column", sm: "row" }} spacing={10}>
        <Box>
          <Text fontSize={{ base: "16px", sm: "20px" }}>CLASS</Text>
          <HStack>
            <Image src="/nft-bottle.svg" width={"30px"} height={"30px"} alt="bottle" />
            <Text fontSize={{ base: "18px", sm: "25px" }} textColor={"white"}>
              Plant
            </Text>
          </HStack>
        </Box>
        <Box>
          <Text fontSize={{ base: "16px", sm: "20px" }}>BREED COUNT</Text>
          <Text
            fontSize={{ base: "18px", sm: "25px" }}
            fontWeight={600}
            textColor={"white"}
          >
            0/7
          </Text>
        </Box>
      </Stack>
      <Box width={"100%"} h={"1px"} mt={"2.5"} bg={"white"} />
      <SearchTab />
      <Traits />
      <FamilyTree />
    </Box>
  );
};

const SearchTab = () => {
  return (
    <Stack
      direction={{ base: "column-reverse", sm: "row" }}
      justify={"space-between"}
      gap={10}
      my={5}
    >
      <HStack whiteSpace="nowrap" spacing={10}>
        <Text textColor={"blue"}>Body parts</Text>
        <Text>Genes Details</Text>
      </HStack>
      <InputGroup
        maxW={"300px"}
        border={"1px solid white"}
        borderRadius={"full"}
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="white" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          pl="50px"
          border={"none"}
          outline={"none"}
          _placeholder={{ color: "gray.400" }}
          _focus={{ boxShadow: "none", outline: "none" }}
        />
      </InputGroup>
    </Stack>
  );
};

const traits = ["EYES", "BODY", "EARS", "CLOAK", "MOUTH", "WAND"];

const Traits = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      columnGap={4}
      rowGap={6}
      bg="black"
      p="5px"
    >
      {traits.map((item) => (
        <Box key={item} display="flex" alignItems="center" gap={3}>
          <Image
            src="/dot-circle.svg"
            alt="dot"
          />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{item}</Text>
            <Text color="gray.500">BLUE</Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

const FamilyTree = () => {
  return (
    <Box
      bg="black"
      p={"5px"}
      borderRadius="xl"
      boxShadow="md"
      color="white"
      w="100%"
    >
      {/* Header */}
      <HStack justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl">Family Tree</Text>
        <IconButton
          icon={<ChevronDownIcon />}
          aria-label="Expand"
          variant="ghost"
          color="white"
        />
      </HStack>

      <Text fontSize="xl" color="gray.400" mb={3} letterSpacing="1px">
        PARENTS
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {[1, 2].map((_, idx) => (
          <HStack
            key={idx}
            bgGradient="linear(to-b, #1a1a40, #0f0f20)"
            borderRadius="3xl"
            p={4}
            gap={4}
            alignItems={'center'}
            position="relative"
          >
            <HStack>
              <Image
                src="/dot-circle.svg"
                alt="Parent Avatar"
                boxSize={{ base: "30px", md: "50px" }}
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold" fontSize="sm">
                  GLIMBI CART
                </Text>
                <Text fontSize="lg" color="gray.300">
                  209703
                </Text>
              </VStack>
            </HStack>
            <IconButton
              icon={<InfoIcon />}
              aria-label="Info"
              size="sm"
              colorScheme="white"
              variant="ghost"
              // position="absolute"
              // right={2}
              // top={2}
            />
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};
