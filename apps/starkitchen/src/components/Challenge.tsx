'use client'


// Mock data for characters (you should replace this with your actual data source)
import CharacterCard from "@/components/CharacterCard.tsx";
import {CharactersPictures} from "@/consts.ts";

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

export default function Challenge({ characters }: { characters: any[], challengeName: string }) {

    const playerCharacter = characters[0]
    const opponentCharacter = characters[1]
    const winnerColor = "ring-lime-300"
    const loserColor = "ring-red-300"
    const tieColor = "ring-blue-300"


    if (!playerCharacter || !opponentCharacter) {
        return <div>Loading...</div>
    }

    return (
            <main className="flex-grow flex items-center justify-center">
                <div className=" w-full flex space-between">
                    <CharacterCard img={CharactersPictures[characters[0].name]} character={playerCharacter} ringColor="ring-lime-300" isSelected={true} onSelect={() => {}} />
                    <CharacterCard img={CharactersPictures[characters[1].name]} character={opponentCharacter} ringColor="ring-red-300" isSelected={true} onSelect={() => {}} />
                </div>
            </main>

    )
}

