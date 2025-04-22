import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React from "react";

const lists = [
  "Magical Abilities",
  "Showcase part evolution",
  "Recent Ability",
  "Sale History",
];

export const NftSelect = () => {
  return (
    <VStack w={"100%"} spacing={7}>
      {lists.map((item) => (
        <HStack
          key={item}
          w={"100%"}
          justify={"space-between"}
          bg={"black"}
          p={"20px"}
        >
          <Text fontSize={'20px'}>{item}</Text>
          <IconButton
            bg="transparent"
            borderRadius="full"
            color={"white"}
            p={2}
            fontSize={"50px"}
            icon={<ChevronDown size={25} />}
            aria-label="select"
          />
        </HStack>
      ))}
    </VStack>
  );
};
