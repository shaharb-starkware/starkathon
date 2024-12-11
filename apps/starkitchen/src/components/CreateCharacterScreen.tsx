import CharacterCreationForm from '@/components/CharacterCreationForm'
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";

export default function CreateCharacterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8 relative">
            <Button
                variant="ghost"
                className="text-white hover:bg-white/20 absolute top-4 left-4"
                asChild
            >
                <div>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main Page
                </div>
            </Button>
            <div className="max-w-md mx-auto pt-8">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Create New Character</h1>
                <CharacterCreationForm />
            </div>
        </div>
    )
}

