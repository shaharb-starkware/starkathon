import { Button } from '../ui/button';
import { Play } from 'lucide-react'


export const PlayButton = ({onClick, isDisabled}: {
    isDisabled?: boolean
    onClick: () => void
}) => {

    return (
        <Button disabled={isDisabled} onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl p-6 w-64">
            <Play className="mr-2 h-6 w-6" /> Start Game
        </Button>
    )
}