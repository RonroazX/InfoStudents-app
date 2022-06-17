import Link from "next/link";
import { offer } from "../lib/types";
import React from "react";
import {
  Box,
  Text,
  Stack,
  StackDivider,
  Flex,
  useColorModeValue as mode,
  Button,
  Badge,
  Divider,
} from "@chakra-ui/react";

interface OffersFeed {
  offers: offer[];
  admin: boolean;
}

interface DescriptionProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
  isRecommended?: boolean;
  onClickEnable?: React.MouseEventHandler;
}

export const OfferFeed: React.FC<OffersFeed> = ({ offers, admin }) => {
  return (
    <>
      <Box
        as="section"
        bg={mode("gray.100", "inherit")}
        py="12"
        marginTop={"12"}
      >
        {offers
          ? offers.map((offer) => (
              <OfferItem offer={offer} key={offer.slug} admin={admin} />
            ))
          : []}
      </Box>
    </>
  );
};

function OfferItem({ offer, admin = false }: { offer: offer; admin: boolean }) {
  return (
    <Box
      maxW={{ base: "xl", md: "7xl" }}
      mx="auto"
      px={{ md: "8" }}
      marginBottom={"10"}
    >
      <Box
        rounded={{ lg: "lg" }}
        bg={mode("white", "gray.700")}
        maxW="3xl"
        mx="auto"
        shadow="base"
        overflow="hidden"
      >
        <Box px="6" py="4">
          <Text as="h3" fontWeight="bold" fontSize="lg">
            Puesto: {offer.title}
          </Text>
        </Box>
        <Divider />
        <Flex justifyContent={"space-between"}>
          <Link href={`/${offer.username}`}>
            <Button variant={"link"} padding={"4"}>
              {offer.username}
            </Button>
          </Link>
          <Button
            variant={"solid"}
            padding={"4"}
            margin={"4"}
            colorScheme={"teal"}
          >
            Aplicar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export const Description = (props: DescriptionProps) => {
  const { title, children, icon, isRecommended, onClickEnable } = props;
  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      spacing="5"
      justify="space-between"
      pos="relative"
    >
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing="4"
        align="flex-start"
        flex="1"
      >
        <Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
          {icon}
        </Box>
        <Box flex="1">
          <Box as="h4" fontWeight="bold" maxW="xl">
            <span>{title}</span>{" "}
            {isRecommended && <Badge marginStart="1">Recommended</Badge>}
          </Box>
          <Box
            maxW={{ base: "xs", md: "unset" }}
            color={mode("gray.600", "gray.400")}
            fontSize="sm"
          >
            {children}
          </Box>
        </Box>
      </Stack>
      <Button colorScheme="blue" onClick={onClickEnable}>
        Enable
      </Button>
    </Stack>
  );
};
