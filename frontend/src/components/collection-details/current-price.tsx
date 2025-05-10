import { aldrichVariable } from "@/app/fonts";
import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";

export const CurrentPrice = () => {
  return (
    <Stack gap={"0px"}>
      <Text
        fontSize={"1rem"}
        fontFamily={aldrichVariable}
        color={"#CECCD6"}
        lineHeight={"160%"}
      >
        CURRENT PRICE
      </Text>
      <Stack mr={"auto"}>
        <HStack gap={"4px"} alignItems={"center"}>
          <Image src={"/ui/token.png"} alt="mint" width={30} height={30} />
          <Heading
            fontWeight={400}
            lineHeight={"160%"}
            fontSize={"24px"}
            color={"white"}
          >
            120
          </Heading>
          <Text
            fontFamily={aldrichVariable}
            color={"#CECCD6"}
            ml={"1rem"}
            fontWeight={500}
            fontSize={"12px"}
          >
            $20.00
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};
