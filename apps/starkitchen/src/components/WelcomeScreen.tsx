import {ConnectWalletButton} from "@/components/ConnectWalletButton/ConnectWalletButton.tsx";
import CharacterCarousel from "@/components/CharacterCarousel.tsx";
import {CreateButton} from "@/components/ActionButtons/CreateButton.tsx";
import {PlayButton} from "@/components/ActionButtons/PlayButton.tsx";

export const WelcomeScreen =  ({onCreateCharClick, onSelectChar, selectedChar}: {onCreateCharClick: ()=>void, onSelectChar: ()=> void, selectedChar: any}) => {

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
                <div className="mt-8 flex flex-col items-center gap-6">
                    <PlayButton isDisabled={!selectedChar} />
                    <CreateButton onClick={onCreateCharClick}/>
                </div>
            </main>
        </div>

    )
}
