'use client'

import { shortString } from "starknet";
import { ABI, CONTRACT_ADDRESS } from '@/utils/consts';
import { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CharacterCard from './CharacterCard'
import { useAccount, useReadContract } from '@starknet-react/core';

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

export default function CharacterCarousel({onSelectCharacter}:{onSelectCharacter: (character: any) => void}) {
    const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
    const { address } = useAccount();

    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character.id)
        onSelectCharacter(character)
    }



    const { data: rawCharacters } =
        useReadContract({
            functionName: 'foo_get_my_characters',
            abi: ABI,
            address: CONTRACT_ADDRESS,
            args: [address],
        });
    console.log("AAAAA", rawCharacters)
    console.log("BBBBB", address)
    const myCharacters = (rawCharacters || []).map((object : any, index: number) => {
        return {
            id: index,
            name: object["1"],
            image: "src/assets/default-avatar?height=200&width=150",
            stats: [
                { name: "PRT", value: Number(object["2"][0]) },
                { name: "DGN", value: Number(object["2"][1]) },
                { name: "ANS", value: Number(object["2"][2]) },
                { name: "CNN", value: Number(object["2"][3]) },
                { name: "FRN", value: Number(object["2"][4]) },
                { name: "LCK", value: Number(object["2"][5]) },
                { name: "GRE", value: Number(object["2"][6]) },
                { name: "IRG", value: Number(object["2"][7]) },
                { name: "BBE", value: Number(object["2"][8]) },
                { name: "CRI", value: Number(object["2"][9]) },
                { name: "OPT", value: Number(object["2"][10]) },
                { name: "HLK", value: Number(object["2"][11]) },
            ]
        }
    });

    const centerClass = myCharacters.length < 3 ? 'justify-center' : ''

    return (
        <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className={`${centerClass}`}>
                {myCharacters.map((character) => (
                    <CarouselItem key={character.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 py-2">
                        <div className="p-1">
                            <CharacterCard
                                character={character}
                                isSelected={selectedCharacter === character.id}
                                onSelect={() => handleSelectCharacter(character)}
                                ringColor="ring-yellow-500"
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

