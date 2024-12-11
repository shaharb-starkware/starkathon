import { Card, CardContent } from "@/components/ui/card"
import {Image} from "@/components/ui/image.tsx";
import {Stats} from "@/consts.ts";

interface Stat {
    name: string
    value: number
}

interface Character {
    id: number
    name: string
    image: string
    stats: Stat[]
}

interface CharacterCardProps {
    character: Character
    isSelected: boolean
    onSelect: () => void
}

export default function CharacterCard({ character, isSelected, onSelect }: CharacterCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all w-[280px] mx-auto ${isSelected ? 'ring-8 ring-yellow-500' : ''}`}
            onClick={onSelect}
        >
            <CardContent className="p-4 flex flex-col">
                <h3 className="text-xl font-bold text-center mb-2">{character.name}</h3>
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={character.image}
                        alt={character.name}
                        className="rounded-md object-cover"
                        width={280}
                        height={192}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                    {character.stats.map((stat, index) => {
                        const Icon = Stats[stat.name].icon
                        return (<div key={index} className="flex flex-col items-center">
                            <div className="flex gap-1">
                                <Icon />
                                <span className="font-semibold">{stat.name}</span>
                            </div>
                            <span>{stat.value}</span>
                        </div>)
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

