'use client'

import { ABI, CONTRACT_ADDRESS } from '@/utils/consts';
import { useState, useCallback } from 'react'
import { useAccount, useContract, useSendTransaction } from '@starknet-react/core';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Upload } from 'lucide-react'
import { Stats } from '../consts'

export default function CharacterCreationForm() {
    const [name, setName] = useState('')
    const [statValues, setStatValues] = useState(Object.fromEntries(Object.values(Stats).map(stat => [stat, 0])))
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const { address } = useAccount();
    const { contract } = useContract({
        abi: ABI,
        address: CONTRACT_ADDRESS
    });
    // const [formattedData, setFormattedData] = useState(undefined);
    const { send, error } = useSendTransaction({calls: []});

    const totalStats = Object.values(statValues).reduce((sum, value) => sum + value, 0)

    const formatCharacterData = () => {
        // setFormattedData({
        //     name,
        //     stats: Object.values(statValues),
        // })
        return {
            name,
            stats: Object.values(statValues),
        }
    }

    const handleStatChange = (stat: string, change: number) => {
        if (totalStats + change > 45 || statValues[stat] + change < 0 || statValues[stat] + change > 9) return

        setStatValues(prev => ({
            ...prev,
            [stat]: prev[stat] + change
        }))
    }

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        const { name, stats } = formatCharacterData();
        console.log("AAAAAA", name, stats);
        if (contract && address) {
            send ([contract.populate("create_character", [stats])]);
        }
        // Navigate back to the main page
    }

    return (
        <Card className="bg-white/10 backdrop-blur-md border-none">
            <CardContent className="space-y-6 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-white">Character Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/20 text-white placeholder-white/50" />
                    </div>

                    <div>
                        <Label htmlFor="image" className="text-white">Character Image</Label>
                        <div className="mt-2 flex items-center">
                            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            <Button type="button" onClick={() => document.getElementById('image')?.click()} variant="outline" className="text-white border-white bg-transparent hover:bg-white/20 mr-4 ">
                                <Upload className="mr-2 h-4 w-4" /> Upload Image
                            </Button>
                            {imagePreview && (
                                <img src={imagePreview} alt="Character Preview" className="h-20 w-20 object-cover rounded-md" />
                            )}
                        </div>
                    </div>

                    <div>
                        <Label className="text-white">Character Stats (Total: {totalStats}/45)</Label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            {Object.values(Stats).map(stat => (
                                <div key={stat} className="flex items-center justify-between">
                                    <span className="text-white">{stat}</span>
                                    <div className="flex items-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-white border-white bg-transparent hover:bg-white/20"
                                            onClick={() => handleStatChange(stat, -1)}
                                        >
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>
                                        <span className="mx-2 w-6 text-center text-white">{statValues[stat]}</span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-white border-white bg-transparent hover:bg-white/20"
                                            onClick={() => handleStatChange(stat, 1)}
                                        >
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={totalStats !== 45}>
                        Create Character
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

