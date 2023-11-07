import { Button, Heading, Separator } from "@radix-ui/themes";
import { CodeIcon, SunMoonIcon } from "lucide-react";

export default function NavBar() {
    function onChangeMode() {
        if (localStorage.theme === 'dark') {
            document.getElementById('body')!.classList.remove('dark')
            localStorage.setItem('theme', '')
        } else {
            document.getElementById('body')!.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <nav>
            <div className='h-14 border-purple flex justify-between items-center align-middle'>
                <div className='mx-4'>
                    <Heading size='4' color='purple'>OpenAI Explorer</Heading>
                </div>
                <div className='flex space-x-4 mx-4'>
                    <div>
                        <Button variant='surface' color='purple' onClick={() => window.open("https://github.com/ethanlchristensen/OpenAiExplorer")}>
                            <CodeIcon color='purple' strokeWidth={1.25} />
                        </Button>
                    </div>

                    <div>
                        <Button variant='surface' color='purple' onClick={onChangeMode}>
                            <SunMoonIcon color='purple' strokeWidth={1.25} />
                        </Button>
                    </div>

                </div>
            </div>
            <Separator size='4' color='purple' />
        </nav>
    )
}
