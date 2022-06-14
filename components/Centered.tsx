import { Box, Button, Container, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import * as React from 'react'

export const Centered = () => (
    <Box as="section" bg="bg-surface">
        <Container py={{ base: '16', md: '24' }}>
            <Stack spacing={{ base: '8', md: '10' }}>
                <Stack spacing={{ base: '4', md: '5' }} align="center">
                    <Heading size={useBreakpointValue({ base: 'sm', md: 'xl' })}>Buscas Trabjo?</Heading>
                    <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
                        Con InfoStudents, podrás encontrar el trabajo que siempre has deseado con tan solo un clic.
                    </Text>
                </Stack>
                <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
                    <Button variant="ghost" size="lg">
                        Saber más
                    </Button>
                    <Button variant="solid" colorScheme={'teal'} size="lg">
                        Probar
                    </Button>
                </Stack>
            </Stack>
        </Container>
    </Box>
)