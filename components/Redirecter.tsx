import { Spinner, Center, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Redirecter() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/home");
  }, 200);
  return (
    <Box marginTop={"56vh"}>
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      </Center>
    </Box>
  );
}
