import { Box, HStack, Text, VStack } from "@chakra-ui/react";

export const UserProfile = () => {
  return (
    <VStack mr={"auto"}>
      <Text
        mr={"auto"}
        fontSize={{ base: "16px", sm: "24px" }}
        fontWeight={500}
      >
        OWNER
      </Text>
      <HStack>
        <Box width={50} height={50} bg={"gray.400"} borderRadius={"full"}></Box>
        <VStack>
          <Text mr={"auto"}>Johndoe</Text>
          <Text mr={"auto"}>0x7A3b...6D2C</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
