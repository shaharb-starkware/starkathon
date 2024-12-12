use crate::challenge::Challenge;
use crate::types::{CharId, ChallengeId};

#[starknet::interface]
pub trait IStarkWars<TState> {
    fn create_character(ref self: TState, name: ByteArray, stats: Array<u32>) -> CharId;
    fn add_challenge(ref self: TState, challenge: Challenge) -> ChallengeId;
    fn play(ref self: TState, char_id: CharId);
    fn get_my_characters(self: @TState) -> Array<(CharId, ByteArray, Array<u32>)>;
    fn get_challenger(self: @TState) -> (CharId, ByteArray, Array<u32>);
}

pub mod Events {
    use super::{CharId, Challenge, ChallengeId};

    #[derive(Drop, starknet::Event)]
    pub struct CharacterCreated {
        pub char_id: CharId,
        pub name: ByteArray,
        pub stats: Array<u32>,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ChallengeAdded {
        pub challenge_id: ChallengeId,
        pub challenge: Challenge,
    }

    #[derive(Drop, starknet::Event)]
    pub struct DuelStarted {
        pub char_id1: CharId,
        pub char_id2: CharId,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ChallengeAccepted {
        pub challenge_id: ChallengeId,
        pub challenge: Challenge,
        pub survivors: (bool, bool),
    }

    #[derive(Drop, starknet::Event)]
    pub struct DuelEnded {
        pub winner: CharId,
    }

    #[derive(Drop, starknet::Event)]
    pub struct ChallengerUpdated {
        pub new_challenger: CharId,
    }
}