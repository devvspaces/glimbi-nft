import { aldrichVariable } from "@/app/fonts";
import { Box, HStack, Text, Stack } from "@chakra-ui/react";

export const UserProfile = () => {
  return (
    <Stack gap={"8px"}>
      <Text
        fontSize={"1rem"}
        fontFamily={aldrichVariable}
        color={"#CECCD6"}
        lineHeight={"160%"}
      >
        OWNER
      </Text>
      <HStack gap={"8px"} alignItems={"center"}>
        <Box width={50} height={50} bg={"gray.400"} borderRadius={"full"}></Box>
        <Stack>
          <Text fontSize={"14px"}>Johndoe</Text>
          <Text fontSize={'12px'} fontFamily={aldrichVariable} color={"#CECCD6"}>
            0x7A3b6D2C6D2C6D2C6D2C
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
