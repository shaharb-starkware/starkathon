import {WelcomeScreen} from "@/components/WelcomeScreen.tsx";
import {useState} from "react";
import CreateCharacterPage from "@/components/CreateCharacterScreen.tsx";

enum ScreenTypes {
    Welcome = 'welcome',
    Create = 'create',
    Match = 'match',
    Summary = 'summary'
}

export const Game = () => {
    const [activeScreen, setActiveScreen] = useState(ScreenTypes.Welcome);

    const handleCreateCharacter = () => {
        // Implement character creation logic here
        console.log("Creating a new character...")
        setActiveScreen(ScreenTypes.Create);
    }

  return (
    <div className="min-h-screen w-screen bg-gray-100">
        {activeScreen === ScreenTypes.Welcome ? <WelcomeScreen onCreateCharClick={handleCreateCharacter}/> : activeScreen === ScreenTypes.Create ? <CreateCharacterPage/> : activeScreen === ScreenTypes.Match ? <div>Match Screen</div> : <div>Match Summary</div>}

    </div>
  );
};
