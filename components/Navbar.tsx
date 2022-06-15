import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  Menu,
  Heading,
  Avatar,
  useBreakpointValue,
  useColorModeValue,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import * as React from "react";
import { SettingsIcon, AddIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { signOut, User } from "@firebase/auth";

function NavBarAccess() {
  return (
    <HStack spacing="3">
      <Link
        href={{
          pathname: "/enter",
          query: { student: false },
        }}
      >
        <Button variant="ghost" colorScheme="teal">
          Acceso Empresas
        </Button>
      </Link>
      <Link
        href={{
          pathname: "/enter",
          query: { student: true },
        }}
      >
        <Button variant="solid" colorScheme="teal">
          Acceso Estudiantes
        </Button>
      </Link>
    </HStack>
  );
}

function NavBarFeatures({
  student,
  user,
  username,
}: {
  student: boolean;
  user: User;
  username: string;
}) {
  return student ? (
    <HStack spacing="4">
      <Tooltip label="Configuración" fontSize="md">
        <IconButton
          variant="ghost"
          aria-label="User Settings button"
          icon={<SettingsIcon />}
        />
      </Tooltip>
      <Menu>
        <MenuButton as={Avatar} src={user?.photoURL} cursor="pointer" />
        <MenuList>
          <Link href={`/${username}`}>
            <MenuItem icon={<EditIcon />}>Perfil</MenuItem>
          </Link>
          <MenuItem
            icon={<LockIcon />}
            onClick={() => {
              signOut(auth);
            }}
          >
            Salir
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  ) : (
    <HStack spacing="4">
      <Tooltip label="Añadir Oferta" fontSize="md">
        <IconButton
          variant="ghost"
          aria-label="User Settings button"
          icon={<AddIcon />}
        />
      </Tooltip>
      <Tooltip label="Configuración" fontSize="md">
        <IconButton
          variant="ghost"
          aria-label="User Settings button"
          icon={<SettingsIcon />}
        />
      </Tooltip>
      <Menu>
        <MenuButton as={Avatar} src={user?.photoURL} cursor="pointer" />
        <MenuList>
          <Link href={`/${username}`}>
            <MenuItem icon={<EditIcon />}>Perfil</MenuItem>
          </Link>
          <MenuItem
            icon={<LockIcon />}
            onClick={() => {
              signOut(auth);
            }}
          >
            Salir
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { user, isRegistered, studentType, username } = useContext(UserContext);

  return (
    <Box as="section" pb={{ base: "12", md: "4" }}>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "4", lg: "3" }}>
          <HStack spacing="10" justify="center">
            <Link href="/">
              <Box bg="teal" p={3} borderRadius={5} as="button">
                <Heading size="lg" color="white">
                  InfoStudents
                </Heading>
              </Box>
            </Link>
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8" marginRight="28">
                  {["Product", "Pricing", "Resources", "Support"].map(
                    (item) => (
                      <Button variant="ghost" key={item}>
                        {item}
                      </Button>
                    )
                  )}
                </ButtonGroup>
                {user ? (
                  isRegistered ? (
                    studentType ? (
                      <NavBarFeatures
                        student={true}
                        user={user}
                        username={username}
                      />
                    ) : (
                      <NavBarFeatures
                        student={false}
                        user={user}
                        username={username}
                      />
                    )
                  ) : (
                    <NavBarAccess />
                  )
                ) : (
                  <NavBarAccess />
                )}
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
