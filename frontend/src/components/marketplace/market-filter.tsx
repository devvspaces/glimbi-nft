import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";

export const MarketFilter = () => {
  return (
    <Box
      bg="#14112A"
      p={4}
      color="white"
      w="100%"
      maxW="240px"
      display={{ base: "none", sm: "flex" }}
      rounded={"xl"}
    >
      <VStack align="stretch" spacing={4}>
        {/* Search Input */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="white" />
          </InputLeftElement>
          <Input
            rounded={"full"}
            type="text"
            placeholder="Search"
            bg="#14112A"
            pl={"50px"}
            borderColor="#333"
            _placeholder={{ color: "gray.400" }}
          />
        </InputGroup>

        <VStack spacing={"20px"}>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Class
            </Text>
            <Select
              placeholder="Choose"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Parts
            </Text>
            <Select
              placeholder="Choose part"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Parity & Genres
            </Text>
            <Select
              placeholder="Choose"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Breed count
            </Text>
            <Select
              placeholder="Choose"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Special collection
            </Text>
            <Select
              placeholder="Choose"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Box w="100%">
            <Text py={"10px"} ml={"5px"}>
              Evolved parts
            </Text>
            <Select
              placeholder="Choose"
              bg="#14112A"
              borderColor="#333"
              color="white"
              rounded={"full"}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </VStack>
        <Image
          cursor={"pointer"}
          alt="Connect wallet"
          mt={"15px"}
          src="/ui/apply-filter.svg"
        />
      </VStack>
    </Box>
  );
};
