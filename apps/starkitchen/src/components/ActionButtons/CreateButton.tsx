import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react'

export const CreateButton = () => {

        const handleCreateCharacter = () => {
            // Implement character creation logic here
            console.log("Creating a new character...")
        }

        return (
            <Button onClick={handleCreateCharacter} className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-6 py-3 w-64">
                <UserPlus className="mr-2 h-5 w-5" /> Create New Character
            </Button>
        )
}
