import {ConnectWalletButton} from "@/components/ConnectWalletButton/ConnectWalletButton.tsx";
import CharacterCarousel from "@/components/CharacterCarousel.tsx";
import {CreateButton} from "@/components/ActionButtons/CreateButton.tsx";
import { PlayButton } from "@/components/ActionButtons/PlayButton.tsx";
import { useReadContract } from '@starknet-react/core';
import { ABI, CONTRACT_ADDRESS } from '@/utils/consts';
// import {Header} from "@/components/Header/Header.tsx";


export const WelcomeScreen =  ({onStartGame, onCreateCharClick, onSelectChar, selectedChar}: {onStartGame: () => void, onCreateCharClick: ()=>void, onSelectChar: ()=> void, selectedChar: any}) => {

    const { data: rawChallenger } =
        useReadContract({
            functionName: 'get_challenger',
            abi: ABI,
            address: CONTRACT_ADDRESS,
            args: [],
        });
    console.log("challenger output is", rawChallenger);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
            <header className="flex justify-end mb-8">
                <ConnectWalletButton/>
            </header>
            <main className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome to StarkWars</h1>
                <div className="mb-12">
                    <CharacterCarousel onSelectCharacter={onSelectChar}/>
                </div>
        < div className = "mt-8 flex flex-col items-center gap-6" >
                    {rawChallenger?<h1 className="text-3xl font-bold text-white mb-8 text-center" > Current Champion: { rawChallenger["1"] } </h1>:null}
                    <PlayButton isDisabled={!selectedChar} onClick={onStartGame}/>
                    <CreateButton onClick={onCreateCharClick}/>
                </div>
            </main>
        </div>

    )
}
