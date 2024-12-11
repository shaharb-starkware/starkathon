import { Button } from '../ui/button';
import { Play } from 'lucide-react'


export const PlayButton = () => {
    const handleStartGame = () => {
        // Implement game start logic here
        console.log("Starting the game...")
    }

    return (
        <Button onClick={handleStartGame} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4 w-64">
            <Play className="mr-2 h-6 w-6" /> Start Game
        </Button>
    )
}