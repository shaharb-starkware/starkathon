
// import { useAccount } from '@starknet-react/core';
import {ConnectWalletButton} from "@/components/ConnectWalletButton/ConnectWalletButton.tsx";
import CharacterCarousel from "@/components/CharacterCarousel.tsx";
import {CreateButton} from "@/components/ActionButtons/CreateButton.tsx";
import {PlayButton} from "@/components/ActionButtons/PlayButton.tsx";
// import {useAccount} from "@starknet-react/core";

export const WelcomeScreen =  ({onCreateCharClick}: {onCreateCharClick: ()=>void}) => {
    // const starknetWallet = useAccount();




    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
            <header className="flex justify-end mb-8">
                <ConnectWalletButton/>
            </header>
            <main className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome to StarkWars</h1>
                <div className="mb-12">
                    <CharacterCarousel/>
                </div>
                <div className="mt-8 flex flex-col items-center gap-6">
                    <PlayButton/>
                    <CreateButton onClick={onCreateCharClick}/>
                </div>
            </main>
        </div>

    )
}
