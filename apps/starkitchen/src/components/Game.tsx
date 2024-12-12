import {WelcomeScreen} from "@/components/WelcomeScreen.tsx";
import {useState} from "react";
import CreateCharacterPage from "@/components/CreateCharacterScreen.tsx";
import {ChallengeScreen} from "@/components/ChallengeScreen.tsx";

enum ScreenTypes {
    Welcome = 'welcome',
    Create = 'create',
    Match = 'match',
    Summary = 'summary'
}

export const Game = () => {
    const [activeScreen, setActiveScreen] = useState(ScreenTypes.Welcome);
    const [selectedCharacter, setSelectedCharacter] = useState(null)

    const handleCreateCharacter = () => {
        // Implement character creation logic here
        console.log("Creating a new character...")
        setActiveScreen(ScreenTypes.Create);
    }

    const handleReturnToMain = () => {
        // Implement character creation logic here
        console.log("Returning to welcome page...")
        setActiveScreen(ScreenTypes.Welcome);
    }

    const handleStartGame = () => {
        // Implement character creation logic here
        console.log("Starting game...")
        setActiveScreen(ScreenTypes.Match);
    }

  return (
    <div className="min-h-screen w-screen bg-gray-100">
        {activeScreen === ScreenTypes.Welcome ? <WelcomeScreen onStartGame={handleStartGame} onCreateCharClick={handleCreateCharacter} onSelectChar={setSelectedCharacter} selectedChar={selectedCharacter}/> :
            activeScreen === ScreenTypes.Create ? <CreateCharacterPage onReturn={handleReturnToMain}/> :
            activeScreen === ScreenTypes.Match ? <ChallengeScreen characters={[selectedCharacter, selectedCharacter]}/> : <div>Match Summary</div>}

    </div>
  );
};
