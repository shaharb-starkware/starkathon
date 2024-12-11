import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react'

export const CreateButton = ({onClick}: {onClick: () => void}) => {

        return (
            <Button onClick={onClick} className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg p-6 w-64">
                <UserPlus className="mr-2 h-5 w-5" /> Create Character
            </Button>
        )
}
