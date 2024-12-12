import Challenge from "@/components/Challenge.tsx";
import {useState} from "react";
import {ChallengesPictures} from "@/consts.ts";
import {Button} from "@/components/ui/button.tsx";

const Challenges = ["Shark Attack", "Nuclear War Threat", "Trex On a Treadmill", "Staring Contest with a Goldfish"]


export const ChallengeScreen = ({characters}) => {
    const [challangeNum, setChallengeNum] = useState(0);

    const handleNext = () => {
        // Implement the next action here
        console.log("Next action")
        setChallengeNum(challangeNum + 1)
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col"
             style={{backgroundImage: `url(${ChallengesPictures[Challenges[challangeNum]]})`}}>
            <header className="bg-white bg-opacity-40 p-4">
                <h1 className="text-3xl font-bold text-white text-center">{Challenges[challangeNum]}</h1>
            </header>
            <Challenge characters={characters} challengeName={Challenges[challangeNum]}/>
            <footer className="bg-white bg-opacity-40 p-4 flex justify-center">
                <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4">
                    Next
                </Button>
            </footer>
        </div>

    );}