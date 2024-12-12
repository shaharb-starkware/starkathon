import Challenge from "@/components/Challenge.tsx";
import {useState} from "react";

export const ChallengeScreen = ({characters}) => {
    const [challengeName, setChallengeName] = useState('First Challenge');
    return (
        <Challenge characters={characters} challengeName={challengeName} imgSrc={'src/assets/challenges/c2.jpg'}/>
    );
}