'use client'


// Mock data for characters (you should replace this with your actual data source)
import CharacterCard from "@/components/CharacterCard.tsx";
import {Button} from "@/components/ui/button.tsx";

const characters = [
    {
        id: 1,
        name: "Warrior",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "STR", value: 18 },
            { name: "DEX", value: 14 },
            { name: "CON", value: 16 },
            { name: "INT", value: 8 },
            { name: "WIS", value: 10 },
            { name: "CHA", value: 12 },
            { name: "HP", value: 45 },
            { name: "AC", value: 16 },
            { name: "ATK", value: 7 },
            { name: "DMG", value: 12 },
            { name: "SPD", value: 30 },
            { name: "INI", value: 2 },
        ]
    },
]

export default function Challenge({ characters , challengeName}: { characters: any[], challengeName: string }) {

    const playerCharacter = characters[0]
    const opponentCharacter = characters[1]

    const handleNext = () => {
        // Implement the next action here
        console.log("Next action")
    }

    if (!playerCharacter || !opponentCharacter) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/assets/challenges/c2?height=1080&width=1920')" }}>
            <header className="bg-black bg-opacity-50 p-4">
                <h1 className="text-2xl font-bold text-white text-center">{challengeName}</h1>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <div className="flex space-x-8">
                    <CharacterCard character={playerCharacter} isSelected={false} onSelect={() => {}} />
                    <CharacterCard character={opponentCharacter} isSelected={false} onSelect={() => {}} />
                </div>
            </main>
            <footer className="bg-black bg-opacity-50 p-4 flex justify-center">
                <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4">
                    Next
                </Button>
            </footer>
        </div>
    )
}

