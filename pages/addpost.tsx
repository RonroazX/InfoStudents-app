import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { useRouter } from "next/router";
import {
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { auth } from "../lib/firebase";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { toast } from "react-hot-toast";
import firebase from "firebase/compat";
import { collection } from "@firebase/firestore";

export default function AddPost() {
  return <CreateOffer />;
}

function CreateOffer() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const createOffers = async (e: any) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    const ref = collection(getFirestore(), "users", `${uid}`, "offers");

    const data = {
      title,
      uid,
      username,
      published: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(ref, data);

    toast.success("Oferta Creada");
    router.push("/home");
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "sm", md: "lg" })}>
              Añadir Oferta
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("lg", "md-dark") }}
          borderRadius={{ base: "none", sm: "lg" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Titulo Oferta</FormLabel>
                <Input
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  marginBottom={"8"}
                />
                <Select placeholder="Estudios mínimos" marginBottom={"8"}>
                  <option value="option1">Estudios Superiores</option>
                  <option value="option2">Estudios Medios</option>
                  <option value="option3">ESO</option>
                </Select>
                <FormLabel htmlFor="cif">Idiomas</FormLabel>
                <Input id="languages" type="text" marginBottom={"4"} />
                <FormLabel htmlFor="employers">Salario</FormLabel>
                <Input id="salary" type="number" marginBottom={"4"} />
                <FormLabel htmlFor="email">Categoría</FormLabel>
                <Input id="category" type="email" marginBottom={"4"} />
                <Center>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    onClick={createOffers}
                  >
                    Añadir
                  </Button>
                </Center>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
