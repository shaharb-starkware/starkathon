'use client'

import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CharacterCard from './CharacterCard'

// Mock data for characters with stats
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
    {
        id: 2,
        name: "Mage",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "STR", value: 8 },
            { name: "DEX", value: 12 },
            { name: "CON", value: 10 },
            { name: "INT", value: 18 },
            { name: "WIS", value: 16 },
            { name: "CHA", value: 14 },
            { name: "HP", value: 30 },
            { name: "AC", value: 12 },
            { name: "ATK", value: 5 },
            { name: "DMG", value: 10 },
            { name: "SPD", value: 25 },
            { name: "INI", value: 1 },
        ]
    },
    {
        id: 3,
        name: "Rogue",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "STR", value: 12 },
            { name: "DEX", value: 18 },
            { name: "CON", value: 14 },
            { name: "INT", value: 13 },
            { name: "WIS", value: 10 },
            { name: "CHA", value: 15 },
            { name: "HP", value: 35 },
            { name: "AC", value: 15 },
            { name: "ATK", value: 8 },
            { name: "DMG", value: 8 },
            { name: "SPD", value: 35 },
            { name: "INI", value: 4 },
        ]
    },
    {
        id: 4,
        name: "Cleric",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "STR", value: 14 },
            { name: "DEX", value: 10 },
            { name: "CON", value: 14 },
            { name: "INT", value: 12 },
            { name: "WIS", value: 18 },
            { name: "CHA", value: 16 },
            { name: "HP", value: 40 },
            { name: "AC", value: 14 },
            { name: "ATK", value: 6 },
            { name: "DMG", value: 8 },
            { name: "SPD", value: 25 },
            { name: "INI", value: 0 },
        ]
    },
]

export default function CharacterCarousel() {
    const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)

    return (
        <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
                {characters.map((character) => (
                    <CarouselItem key={character.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                        <div className="p-1">
                            <CharacterCard
                                character={character}
                                isSelected={selectedCharacter === character.id}
                                onSelect={() => setSelectedCharacter(character.id)}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

