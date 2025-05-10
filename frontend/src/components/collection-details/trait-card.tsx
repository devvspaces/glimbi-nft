import { aldrichVariable } from "@/app/fonts";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChevronDown,
} from "lucide-react";

export const TraitCard = () => {
  return (
    <Stack width={"100%"} gap={"20px"}>
      <Stack
        gap={"20px"}
        bg={"#14112A"}
        rounded={"20px"}
        border={"1px solid #393275"}
        p={"24px"}
      >
        <HStack w={"100%"} justify={"space-between"}>
          <Heading fontSize={"32px"} textColor={"white"}>
            Traits
          </Heading>
          <IconButton
            hidden={true}
            bg="transparent"
            borderRadius="full"
            color={"white"}
            p={2}
            icon={<ChevronDown size={40} />}
            aria-label="select"
            width={"40px"}
            height={"40px"}
          />
        </HStack>
        <HStack spacing={10}>
          <Box>
            <Text
              mb={"8px"}
              color={"#CECCD6"}
              fontFamily={aldrichVariable}
              fontSize={".9rem"}
            >
              CLASS
            </Text>
            <HStack bg={"#1E1A3F"} p={"4px 8px"} rounded={"full"} gap={"4px"}>
              <Image
                src="/nft-bottle.svg"
                width={"20px"}
                height={"20px"}
                alt="bottle"
              />
              <Text fontSize={"1rem"} textColor={"white"}>
                Plant
              </Text>
            </HStack>
          </Box>
          <Box>
            <Text
              mb={"8px"}
              color={"#CECCD6"}
              fontFamily={aldrichVariable}
              fontSize={".9rem"}
            >
              BREED COUNT
            </Text>
            <Text fontSize={"1rem"} fontWeight={600} textColor={"white"}>
              0/7
            </Text>
          </Box>
        </HStack>
        <Box width={"100%"} h={"1px"} bg={"white"} />
        <SearchTab />
        <Traits />
      </Stack>
    </Stack>
  );
};

const SearchTab = () => {
  return (
    <HStack
      justify={"space-between"}
      gap={'1rem'}
    >
      <HStack spacing={'1rem'}>
        <Text color={'#1D3A9D'} bg={'#1E1A3F'} p={'12px 16px'} rounded={'full'}>Body parts</Text>
        <Text p={'12px 16px'} rounded={'full'}>Genes Details</Text>
      </HStack>
    </HStack>
  );
};

const traits = ["EYES", "BODY", "EARS", "CLOAK", "MOUTH", "WAND"];

const Traits = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={4} rowGap={6} p="5px">
      {traits.map((item) => (
        <Box key={item} display="flex" alignItems="center" gap={'8px'}>
          <Image src="/dot-circle.svg" alt="dot" />
          <VStack align="start" spacing={'4px'}>
            <Text color={'#CECCD6'} fontFamily={aldrichVariable}>{item}</Text>
            <Text textTransform={'uppercase'} color="gray.500">BLUE</Text>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

// const FamilyTree = () => {
//   return (
//     <Box
//       bg="black"
//       p={"5px"}
//       borderRadius="xl"
//       boxShadow="md"
//       color="white"
//       w="100%"
//     >
//       {/* Header */}
//       <HStack justify="space-between" align="center" mb={6}>
//         <Text fontSize="2xl">Family Tree</Text>
//         <IconButton
//           icon={<ChevronDownIcon />}
//           aria-label="Expand"
//           variant="ghost"
//           color="white"
//         />
//       </HStack>

//       <Text fontSize="xl" color="gray.400" mb={3} letterSpacing="1px">
//         PARENTS
//       </Text>

//       <SimpleGrid columns={{ base: 1, md: 2 }}>
//         {[1, 2].map((_, idx) => (
//           <HStack
//             key={idx}
//             bgGradient="linear(to-b, #1a1a40, #0f0f20)"
//             borderRadius="3xl"
//             p={4}
//             gap={4}
//             alignItems={"center"}
//             position="relative"
//           >
//             <HStack>
//               <Image
//                 src="/dot-circle.svg"
//                 alt="Parent Avatar"
//                 boxSize={{ base: "30px", md: "50px" }}
//               />
//               <VStack align="start" spacing={1}>
//                 <Text fontWeight="bold" fontSize="sm">
//                   GLIMBI CART
//                 </Text>
//                 <Text fontSize="lg" color="gray.300">
//                   209703
//                 </Text>
//               </VStack>
//             </HStack>
//             <IconButton
//               icon={<InfoIcon />}
//               aria-label="Info"
//               size="sm"
//               colorScheme="white"
//               variant="ghost"
//               // position="absolute"
//               // right={2}
//               // top={2}
//             />
//           </HStack>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };
