import { HStack, Image, Text, VStack } from "@chakra-ui/react";

export const CurrentPrice = () => {
  return (
    <VStack mr={"auto"}>
      <Text mr={"auto"} fontSize={"24px"} fontWeight={500}>
        CURRENT PRICE
      </Text>
      <VStack mr={"auto"}>
        <HStack
          gap={"10px"}
          mr={"auto"}
          alignItems={"center"}
          justify={"center"}
        >
          <Image src={"/ui/token.png"} alt="mint" width={30} height={30} />
          <Text fontWeight={400} fontSize={"30px"} textColor={"white"}>
            120
          </Text>
          <Text fontWeight={500} fontSize={"20px"} textColor={"#CECCD6"}>
            $20.00
          </Text>
        </HStack>
        <HStack spacing={5} my={8}>
          <Image
            cursor={"pointer"}
            alt="Connect wallet"
            src="/ui/buy-now.svg"
          />
          <Image
            cursor={"pointer"}
            alt="Connect wallet"
            src="/ui/make-offer.svg"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};
