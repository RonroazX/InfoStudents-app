import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
  useBreakpointValue,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import * as React from "react";
import { OAuthButtonGroup } from "../components/OAuthButtonGroup";
import { PasswordField } from "../components/PasswordField";
import Link from "next/link";
import Home from "./home";
import { useContext, useState } from "react";
import { UserContext } from "../lib/context";
import { doc, getDoc, getFirestore, writeBatch } from "firebase/firestore";
import { User } from "@firebase/auth";
import queryResolver from "../lib/queryResolver";
import { useRouter } from "next/router";
import Redirecter from "../components/Redirecter";

export default function Enter() {
  const { isRegistered, user } = useContext(UserContext);
  const router = useRouter();
  const query = router.query;
  const queryContent = query.student;
  let userStudentType = queryResolver(queryContent);
  return (
    <>
      {user ? (
        isRegistered ? (
          <Redirecter />
        ) : (
          <Register student={userStudentType} />
        )
      ) : (
        <Login />
      )}
    </>
  );
}

export function Login() {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Center>
            <Link href="/">
              <Box bg="teal" p={3} borderRadius={5} as="button" width={"56"}>
                <Heading size="lg" color="white">
                  InfoStudents
                </Heading>
              </Box>
            </Link>
          </Center>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don&apos;t have an account?</Text>
              <Button variant="link" colorScheme="teal">
                Sign up
              </Button>
            </HStack>
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
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="teal" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary">Sign in</Button>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

const userExists = async ({
  user,
  studentType,
  name,
  username,
}: {
  user: User | null | undefined;
  studentType: boolean;
  name: string;
  username: string;
}) => {
  const ref = doc(getFirestore(), "users", `${user?.uid}`);
  const ref2 = doc(getFirestore(), "usernames", username.toLocaleLowerCase());
  const snap = await getDoc(ref);
  const usernameSnap = await getDoc(ref2);
  if (!snap.exists() && !usernameSnap.exists()) {
    const batch = writeBatch(getFirestore());
    batch.set(ref2, { uid: user?.uid });
    batch.set(ref, {
      username: username.toLowerCase(),
      studentType: studentType,
      name: name,
      lastName: "Escriva",
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    await batch.commit();
  }
};

export function Register({ student }: { student: boolean }) {
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useContext(UserContext);
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Center>
            <Link href="/">
              <Box bg="teal" p={3} borderRadius={5} as="button" width={"56"}>
                <Heading size="lg" color="white">
                  InfoStudents
                </Heading>
              </Box>
            </Link>
          </Center>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "sm", md: "lg" })}>
              Register
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
                {!student && (
                  <>
                    <FormLabel htmlFor="username">Nombre de Usuario</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      marginBottom={"4"}
                      onChange={(e) => {
                        setUsername(e.currentTarget.value);
                      }}
                    />
                    <FormLabel htmlFor="name">Nombre Empresa</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      marginBottom={"4"}
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
                      }}
                    />
                    <FormLabel htmlFor="cif">CIF</FormLabel>
                    <Input id="cif" type="text" marginBottom={"4"} />
                    <FormLabel htmlFor="employers">
                      Número de Empleados
                    </FormLabel>
                    <Input id="employers" type="number" marginBottom={"4"} />
                  </>
                )}
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" marginBottom={"4"} />
                {student && (
                  <>
                    <FormLabel htmlFor="username">Nombre de Usuario</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      marginBottom={"4"}
                      onChange={(e) => {
                        setUsername(e.currentTarget.value);
                      }}
                    />
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      marginBottom={"4"}
                      onChange={(e) => {
                        setValue(e.currentTarget.value);
                      }}
                    />
                    <FormLabel htmlFor="lastName">Apellido</FormLabel>
                    <Input id="lastName" type="text" marginBottom={"4"} />
                    <FormLabel htmlFor="lastName">Estudios</FormLabel>
                    <Select placeholder="Elijo un estudio" marginBottom={"8"}>
                      <option value="option1">Estudios Superiores</option>
                      <option value="option2">Estudios Medios</option>
                      <option value="option3">ESO</option>
                    </Select>
                  </>
                )}
                <Center>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    onClick={() => {
                      userExists({
                        user,
                        studentType: student,
                        name: value,
                        username,
                      });
                    }}
                  >
                    Register
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
