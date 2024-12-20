#[starknet::contract]
pub mod StarkWars {
    use starknet::event::EventEmitter;
    use core::hash::{HashStateTrait};
    use core::num::traits::Pow;
    use core::poseidon::{HashState, PoseidonTrait};
    use core::starknet::{ClassHash, ContractAddress, get_caller_address, get_tx_info};
    use core::starknet::storage::{Map, Vec};
    use crate::character::Character;
    use crate::constants::{STAT_SUM, SEGMENTS, MAX_SCENARIOS, LIVES, MIN_STAT_VALUE, MAX_STAT_VALUE};
    use crate::challenge::Challenge;
    use crate::interface::{IStarkWars, Events};
    use crate::types::{CharId, ChallengeId};
    use crate::utils::SpanExtTrait;
    use starknet::storage::{MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess, VecTrait};
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_upgrades::interface::IUpgradeable;
    use openzeppelin_upgrades::UpgradeableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;
    
    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        /// Upgrades the contract class hash to `new_class_hash`.
        /// This may only be called by the contract owner.
        fn upgrade(ref self: ContractState, new_class_hash: ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }

    #[storage]
    struct Storage {
        challenges: Map<ChallengeId, Challenge>,
        characters: Map<CharId, Character>,
        character_to_owner: Map<CharId, ContractAddress>,
        owner_to_character: Map<ContractAddress, Vec<CharId>>,
        challanger: CharId,
        char_next_id: CharId,
        challenge_next_id: ChallengeId,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        OwnableEvent: OwnableComponent::Event,
        UpgradeableEvent: UpgradeableComponent::Event,
        CharacterCreated: Events::CharacterCreated,
        ChallengeAdded: Events::ChallengeAdded,
        DuelStarted: Events::DuelStarted,
        ChallengeAccepted: Events::ChallengeAccepted,
        DuelEnded: Events::DuelEnded,
        ChallengerUpdated: Events::ChallengerUpdated,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.char_next_id.write(0);
        self.challenge_next_id.write(0);
        self.ownable.initializer(owner: get_tx_info().account_contract_address);
        let char_id = self.create_character("Default", array![4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3]);
        self.challanger.write(char_id);
        self.emit(Events::ChallengerUpdated { new_challenger: char_id });
    }

    fn validate_stats(stats: Span<u32>) {
        let mut sum = 0;
        for stat in stats {
            assert!(*stat <= MAX_STAT_VALUE && *stat >= MIN_STAT_VALUE, "stat value must be between {} and {}", MIN_STAT_VALUE, MAX_STAT_VALUE);
            sum = sum + *stat;
        };
        assert!(sum == STAT_SUM, "sum of stat's values must be {}", STAT_SUM);
    }

    fn get_randomness(len: u64) -> Span<u64> {
        let mut random_indices = array![];
        let mut hash_state: HashState = PoseidonTrait::new();
        hash_state = hash_state.update(starknet::get_block_timestamp().into());
        let mut timestamp_hash: u256 = hash_state.finalize().into();
        for _ in 0..MAX_SCENARIOS {
            let next_random: u64 = (timestamp_hash % 2_u256.pow(SEGMENTS)).try_into().unwrap();
            let mut random_index = next_random % len;
            while random_indices.span().contains(random_index) {
                random_index += 1 % len;
            };
            random_indices.append(random_index);
            timestamp_hash = timestamp_hash / 2_u256.pow(SEGMENTS);
        };
        random_indices.span()
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn compete_challenge(self: @ContractState, challenge: Challenge, char_id1: CharId, char_id2: CharId) -> (bool, bool) {
            let stat1 = challenge.stat1;
            let stat1_char1 = self.characters.entry(char_id1).stats[stat1].read();
            let stat1_char2 = self.characters.entry(char_id2).stats[stat1].read();
            let stat2 = challenge.stat2;
            let stat2_char1 = self.characters.entry(char_id1).stats[stat2].read();
            let stat2_char2 = self.characters.entry(char_id2).stats[stat2].read();
            let min_val1 = challenge.min_value1;
            let min_val2 = challenge.min_value2;
            let char1_survived = stat1_char1 < min_val1 && stat2_char1 < min_val2;
            let char2_survived = stat1_char2 < min_val1 && stat2_char2 < min_val2;
            (char1_survived, char2_survived)
        }

        fn duel(ref self: ContractState, char_id1: CharId, char_id2: CharId) -> CharId {
            self.emit(Events::DuelStarted { char_id1, char_id2 });
            let random_indices = get_randomness(len: self.challenge_next_id.read().into());
            let mut lives1 = LIVES;
            let mut lives2 = LIVES;
            for challenge_index in random_indices {
                let challenge = self.challenges.entry((*challenge_index).try_into().unwrap()).read();
                let (char1_survived, char2_survived) = self.compete_challenge(challenge.clone(), char_id1, char_id2);
                if char1_survived {
                    lives1 -= 1;
                }
                if char2_survived {
                    lives2 -= 1;
                }
                self.emit(Events::ChallengeAccepted { 
                    challenge_id: (*challenge_index).try_into().unwrap(), 
                    challenge: challenge, 
                    survivors: (char1_survived, char2_survived) 
                });
                if lives1 == 0 || lives2 == 0 {
                    break;
                }   
            };
            if lives1 > lives2 {
                return char_id1;
            };
            if lives2 > lives1 {
                return char_id2;
            }
            0
        }
    }

    #[abi(embed_v0)]
    impl StarkWarsImpl of IStarkWars<ContractState> {
        fn create_character(ref self: ContractState, name: ByteArray, stats: Array<u32>) -> CharId {
            validate_stats(stats.span());
            let caller_address = get_caller_address();
            let char_id = self.char_next_id.read();
            self.characters.entry(char_id).name.write(name.clone());
            for stat in stats.span() {
                self.characters.entry(char_id).stats.append().write(*stat);
            };
            self.character_to_owner.entry(char_id).write(caller_address);
            self.owner_to_character.entry(caller_address).append().write(char_id);
            self.char_next_id.write(char_id + 1);
            self.emit(Events::CharacterCreated { char_id, name, stats });
            char_id
        }

        fn add_challenge(ref self: ContractState, challenge: Challenge) -> ChallengeId {
            self.ownable.assert_only_owner();
            let challenge_id = self.challenge_next_id.read();
            self.challenges.entry(challenge_id).write(challenge.clone());
            self.challenge_next_id.write(challenge_id + 1);
            self.emit(Events::ChallengeAdded { challenge_id, challenge });
            challenge_id
        }

        fn play(ref self: ContractState, char_id: CharId) {
            if char_id >= self.char_next_id.read() {
                panic!("character does not exist");
            }
            if self.character_to_owner.entry(char_id).read() != get_caller_address() {
                panic!("caller is not the owner of the character");
            }
            let winner_char_id = self.duel(self.challanger.read(), char_id);
            self.emit(Events::DuelEnded { winner: winner_char_id });
            if winner_char_id != 0 {
                self.challanger.write(winner_char_id);
                self.emit(Events::ChallengerUpdated { new_challenger: winner_char_id });
            }
        }

        fn foo_get_my_characters(self: @ContractState, address: ContractAddress) -> Array<(CharId, ByteArray, Array<u32>)> {
            let char_ids = self.owner_to_character.entry(address);
            let mut characters = array![];
            for i in 0..char_ids.len() {
                let char_id = char_ids.at(i).read();
                let name = self.characters.entry(char_id).name.read();
                let mut stats = array![];
                let self_stats = self.characters.entry(char_id).stats;
                for j in 0..self_stats.len() {
                    stats.append(self_stats.at(j).read());
                };
                characters.append((char_id, name, stats));
            };
            characters
        }

        fn get_challenger(self: @ContractState) -> (CharId, ByteArray, Array<u32>){
            let char_id: u32= self.challanger.read();
            let name = self.characters.entry(char_id).name.read();
            let mut stats = array![];
            let self_stats = self.characters.entry(char_id).stats;
            for j in 0..self_stats.len() {
                stats.append(self_stats.at(j).read());
            };
            (char_id, name, stats)
        }
    }
}
