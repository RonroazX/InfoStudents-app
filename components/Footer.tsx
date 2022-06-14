import {Box, ButtonGroup, Container, Heading, IconButton, Stack, Text} from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Link from "next/link";


export const Footer = () => (
    <Box as="section">
        <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }} maxWidth={"full"} bg={"#F7FAFC"} borderTopRadius={"xl"}>
            <Stack spacing={{ base: '4', md: '5' }}>
                <Stack justify="space-between" direction="row" align="center">
                    <Link href="/">
                        <Box bg="teal" p={3} borderRadius={5} as='button' width={"56"}>
                            <Heading size='lg' color='white'>InfoStudents</Heading>
                        </Box>
                    </Link>
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="LinkedIn"
                            icon={<FaLinkedin fontSize="1.25rem" />}
                        />
                        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
                        <IconButton
                            as="a"
                            href="#"
                            aria-label="Twitter"
                            icon={<FaTwitter fontSize="1.25rem" />}
                        />
                    </ButtonGroup>
                </Stack>
                <Text fontSize="sm" color="subtle">
                    &copy; {new Date().getFullYear()} InfoStudents, Inc. All rights reserved.
                </Text>
            </Stack>
        </Container>
    </Box>

)