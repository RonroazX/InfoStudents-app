import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'
import { auth, googleAuthProvider} from '../lib/firebase'
import { signInWithPopup } from "@firebase/auth"
import {RiTextDirectionL} from "react-icons/all";

const providers = [
    { name: 'Google', icon: <GoogleIcon boxSize="5" /> },
    { name: 'Twitter', icon: <TwitterIcon boxSize="5" /> },
    { name: 'GitHub', icon: <GitHubIcon boxSize="5" /> },
]

export const OAuthButtonGroup = () => (
    <ButtonGroup variant="outline" spacing="4" width="full">
        {providers.map(({ name, icon }) => (
            <Button key={name} width="full" onClick={signInWithGoogle}>
                <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                {icon}
            </Button>
        ))}
    </ButtonGroup>
)

async function signInWithGoogle() {
    let perole;
    try {
        perole = await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
        console.log(e);
    }
}