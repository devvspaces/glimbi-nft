"use client";

import { JsonMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@metaplex-foundation/umi";
import { Box, Text, Divider, SimpleGrid, VStack, Link } from "@chakra-ui/react";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

function getExplorerLink(key: string) {
  return `https://explorer.solana.com/address/${key}?cluster=${process.env.NEXT_PUBLIC_ENVIRONMENT}`;
}

interface TraitProps {
  heading: string;
  description: string;
}

interface TraitsProps {
  metadata: JsonMetadata;
}
const Trait = ({ heading, description }: TraitProps) => {
  return (
    <Box
      bg={"gray.800"}
      borderRadius={"5px"}
      width={"120px"}
      minHeight={"50px"}
      p={2}
    >
      <VStack align={"flex-start"}>
        <Text fontSize={"sm"}>{heading}</Text>
        <Text fontSize={"sm"} marginTop={"-2"} fontWeight={"semibold"}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

const Traits = ({ metadata }: TraitsProps) => {
  if (metadata === undefined || metadata.attributes === undefined) {
    return <></>;
  }

  //find all attributes with trait_type and value
  const traits = metadata.attributes.filter(
    (a) => a.trait_type !== undefined && a.value !== undefined
  );
  const traitList = traits.map((t) => (
    <Trait
      key={t.trait_type}
      heading={t.trait_type ?? ""}
      description={t.value ?? ""}
    />
  ));

  return (
    <>
      <Divider marginTop={"15px"} />
      <SimpleGrid marginTop={"15px"} columns={3} spacing={5}>
        {traitList}
      </SimpleGrid>
    </>
  );
};

export default function Card({
  metadata,
  pkey,
}: {
  metadata: JsonMetadata | undefined;
  pkey: PublicKey;
}) {
  // Get the images from the metadata if animation_url is present use this
  if (!metadata) {
    return <></>;
  }
  const image = metadata.animation_url ?? metadata.image;
  return (
    <Box position={"relative"} width={"full"} overflow={"hidden"}>
      <Box
        key={image}
        height={"sm"}
        position="relative"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundImage={`url(${image})`}
      />
      <Text fontWeight={"semibold"} marginTop={"15px"}>
        {metadata.name}
      </Text>
      <Text>{metadata.description}</Text>
      <Link
        isExternal
        rel="noopener noreferrer"
        color={"blue.500"}
        mt={2}
        mb={2}
        fontSize={"sm"}
        fontWeight={"semibold"}
        textDecoration={"underline"}
        href={getExplorerLink(pkey)}
      >
        View on explorer
      </Link>
      <Traits metadata={metadata} />
    </Box>
  );
}

type Props = {
  nfts:
    | { mint: PublicKey; offChainMetadata: JsonMetadata | undefined }[]
    | undefined;
};

export const ShowNft = ({ nfts }: Props) => {
  if (nfts === undefined) {
    return <></>;
  }

  const cards = nfts.map((nft) => (
    <AccordionItem key={nft.mint + "Accordion"}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {nft.offChainMetadata?.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Card metadata={nft.offChainMetadata} pkey={nft.mint} key={nft.mint} />
      </AccordionPanel>
    </AccordionItem>
  ));
  return (
    <Accordion defaultIndex={[0]} allowMultiple={true}>
      {cards}
    </Accordion>
  );
};
