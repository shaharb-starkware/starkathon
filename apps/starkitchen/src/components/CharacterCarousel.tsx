'use client'

import { shortString } from "starknet";
import { ABI, CONTRACT_ADDRESS } from '@/utils/consts';
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CharacterCard from './CharacterCard'
import { useReadContract } from '@starknet-react/core';

// Mock data for characters with stats
const characters = [
    {
        id: 1,
        name: "Warrior",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "PRT", value: 8 },
            { name: "DGN", value: 1 },
            { name: "ANS", value: 6 },
            { name: "CNN", value: 8 },
            { name: "FRN", value: 1 },
            { name: "LCK", value: 2 },
            { name: "GRE", value: 5 },
            { name: "IRG", value: 6 },
            { name: "BBE", value: 7 },
            { name: "CRI", value: 2 },
            { name: "OPT", value: 0 },
            { name: "HLK", value: 2 },
        ]
    },
    {
        id: 2,
        name: "Mage",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "PRT", value: 8 },
            { name: "DGN", value: 1 },
            { name: "ANS", value: 6 },
            { name: "CNN", value: 8 },
            { name: "FRN", value: 1 },
            { name: "LCK", value: 2 },
            { name: "GRE", value: 5 },
            { name: "IRG", value: 6 },
            { name: "BBE", value: 7 },
            { name: "CRI", value: 2 },
            { name: "OPT", value: 0 },
            { name: "HLK", value: 2 },
        ]
    },
    {
        id: 3,
        name: "Rogue",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "PRT", value: 8 },
            { name: "DGN", value: 1 },
            { name: "ANS", value: 6 },
            { name: "CNN", value: 8 },
            { name: "FRN", value: 1 },
            { name: "LCK", value: 2 },
            { name: "GRE", value: 5 },
            { name: "IRG", value: 6 },
            { name: "BBE", value: 7 },
            { name: "CRI", value: 2 },
            { name: "OPT", value: 0 },
            { name: "HLK", value: 2 },
        ]
    },
    {
        id: 4,
        name: "Cleric",
        image: "/placeholder.svg?height=200&width=150",
        stats: [
            { name: "PRT", value: 8 },
            { name: "DGN", value: 1 },
            { name: "ANS", value: 6 },
            { name: "CNN", value: 8 },
            { name: "FRN", value: 1 },
            { name: "LCK", value: 2 },
            { name: "GRE", value: 5 },
            { name: "IRG", value: 6 },
            { name: "BBE", value: 7 },
            { name: "CRI", value: 2 },
            { name: "OPT", value: 0 },
            { name: "HLK", value: 2 },
        ]
    },
]

export default function CharacterCarousel() {
    const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)

    const { data: rawCharacters } =
        useReadContract({
            functionName: 'get_my_characters',
            abi: ABI,
            address: CONTRACT_ADDRESS,
            args: [],
        });
    const myCharacters = (rawCharacters || []).map((object : any, index: number) => {
        return {
            id: index,
            name: shortString.decodeShortString(object["0"]),
            image: "/placeholder.svg?height=200&width=150",
            stats: [
                { name: "STR", value: Number(object["1"][0]) },
                { name: "DEX", value: Number(object["1"][1]) },
                { name: "CON", value: Number(object["1"][2]) },
                { name: "INT", value: Number(object["1"][3]) },
                { name: "WIS", value: Number(object["1"][4]) },
                { name: "CHA", value: Number(object["1"][5]) },
                { name: "HP", value: Number(object["1"][6]) },
                { name: "AC", value: Number(object["1"][7]) },
                { name: "ATK", value: Number(object["1"][8]) },
                { name: "DMG", value: Number(object["1"][9]) },
                { name: "SPD", value: Number(object["1"][10]) },
                { name: "INI", value: Number(object["1"][11]) },
            ]
        }
    });

    return (
        <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
                {myCharacters.map((character) => (
                    <CarouselItem key={character.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 py-2">
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

