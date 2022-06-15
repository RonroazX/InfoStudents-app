import React from "react";
import {
  Box,
  Center,
  Input,
  Container,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

export default function LandingSearch() {
  return (
    <Box
      backgroundImage={
        "https://www.research4life.org/wp-content/uploads/2019/11/AdobeStock_68929807.jpeg"
      }
      as="section"
      my={{ base: "2", md: "0.5" }}
    >
      <Container py={{ base: "6", md: "28" }}>
        <Center>
          <VStack bg="#E9EFF3" p={{ base: "6", md: "28" }} borderRadius={"xl"}>
            <FormLabel htmlFor="search" fontSize={"2xl"}>
              Buscar Ofertas
            </FormLabel>
            <Input type="text" id="search" borderColor={"teal"} />
          </VStack>
        </Center>
      </Container>
    </Box>
  );
}
