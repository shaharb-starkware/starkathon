import { Card, CardContent } from "@/components/ui/card"

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
            className={`cursor-pointer transition-all w-[280px] mx-auto ${isSelected ? 'ring-4 ring-yellow-500' : ''}`}
            onClick={onSelect}
        >
            <CardContent className="p-4 flex flex-col">
                <h3 className="text-xl font-bold text-center mb-2">{character.name}</h3>
                <div className="relative w-full h-48 mb-4">
                    <img
                        src={character.image}
                        alt={character.name}
                        style={{ objectFit: 'cover', width: 280, height: 192 }}
                    />
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                    {character.stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="font-semibold">{stat.name}</span>
                            <span>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

