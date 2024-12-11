#[starknet::contract]
pub mod Starkwars {
    use core::num::traits::Pow;
    use starknet::storage::MutableVecTrait;
    use starknet::storage::VecTrait;
    use starknet::storage::StoragePathEntry;
    use crate::scenario::Scenario;
    use core::starknet::storage::{Map, Vec};
    use crate::character::Character;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::starknet::{ContractAddress, get_caller_address};
    use openzeppelin_access::ownable::OwnableComponent;
    use core::poseidon::{HashState, PoseidonTrait};
    use core::hash::{HashStateTrait};

    const STAT_SUM: u32 = 45;
    const LIVES: u32 = 2;
    const MAX_SCENARIOS: u32 = 4;
    const SEGMENTS: u32 = 256 / MAX_SCENARIOS;

    type CharId = u32;
    type ScenarioId = u32;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        scenarios: Map<ScenarioId, Scenario>, // TODO consider change to Vec
        characters: Map<CharId, Character>,
        owners: Map<CharId, ContractAddress>,
        owner_to_characters: Map<ContractAddress, Vec<CharId>>,
        challanger: Option<CharId>,
        char_next_id: CharId,
        scenario_next_id: ScenarioId,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        OwnableEvent: OwnableComponent::Event,
    }

    #[starknet::interface]
    pub trait WorldStateTrait<TState> {
        fn create_character(ref self: TState, name: felt252, stats: Array<u32>) -> CharId;
        fn add_scenario(ref self: TState, scenario: Scenario) -> ScenarioId;
        fn play(ref self: TState, char_id: CharId);
        fn get_my_characters(self: @TState) -> Array<(CharId, felt252, Array<u32>)>;
        fn get_challenger(self: @TState) -> Option<(CharId, felt252, Array<u32>)>;
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.char_next_id.write(1);
        self.scenario_next_id.write(0);
        self.ownable.initializer(get_caller_address());

    }

    fn validate_stats(stats: Span<u32>) {
        let mut sum = 0;
        for stat in stats {
            assert!(*stat <= 9 && *stat >= 0, "stat must be between 0 and 9");
            sum = sum + *stat;
        };
        assert!(sum == STAT_SUM, "sum of stats must be 45");
    }

    fn contain(vec: Span<u64>, target: u64) -> bool {
        let mut found = false;
        for id in vec {
            if *id == target {
                found = true;
                break;
            };
        };
        found
    }

    fn get_randomness(len: u64) -> Span<u64> {
        let mut random_indices = array![];
        let mut hash_state: HashState = PoseidonTrait::new();
        hash_state = hash_state.update(starknet::get_block_timestamp().into());
        let mut timestamp_hash: u256 = hash_state.finalize().into();
        for _ in 0..MAX_SCENARIOS {
            let next_random : u64 = (timestamp_hash % 2_u256.pow(SEGMENTS)).try_into().unwrap();
            let mut random_index = next_random % len;
            while contain(random_indices.span(), random_index) {
                random_index += 1 % len;
            };
            random_indices.append(random_index);
            timestamp_hash = timestamp_hash / 2_u256.pow(SEGMENTS);
        };
        random_indices.span()
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn duel(ref self: ContractState, char_id1: CharId, char_id2: CharId) -> CharId {
            let random_indices = get_randomness(len: self.scenario_next_id.read().into());
            let mut lives1 = LIVES;
            let mut lives2 = LIVES;
            for scenario_index in random_indices {
                let scenario = self.scenarios.entry((*scenario_index).try_into().unwrap()).read();
                let stat1 = scenario.stat1;
                let stat1_char1 = self.characters.entry(char_id1).stats[stat1].read();
                let stat1_char2 = self.characters.entry(char_id2).stats[stat1].read();
                let stat2 = scenario.stat2;
                let stat2_char1 = self.characters.entry(char_id1).stats[stat2].read();
                let stat2_char2 = self.characters.entry(char_id2).stats[stat2].read();
                if stat1_char1 < scenario.min_value1 && stat2_char1 < scenario.min_value2 {
                    lives1 -= 1;
                }
                if stat1_char2 < scenario.min_value1 && stat2_char2 < scenario.min_value2 {
                    lives2 -= 1;
                }
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
    impl WorldStateImpl of WorldStateTrait<ContractState> {
        fn create_character(ref self: ContractState, name: felt252, stats: Array<u32>) -> CharId {
            validate_stats(stats.span());
            let caller = get_caller_address();
            let char_id = self.char_next_id.read();
            self.characters.entry(char_id).name.write(name);
            for stat in stats {
                self.characters.entry(char_id).stats.append().write(stat);
            };
            self.owners.entry(char_id).write(caller);
            self.owner_to_characters.entry(caller).append().write(char_id);
            self.char_next_id.write(char_id + 1);
            char_id
        }

        fn add_scenario(ref self: ContractState, scenario: Scenario) -> ScenarioId {
            self.ownable.assert_only_owner();
            let scenario_id = self.scenario_next_id.read();
            self.scenarios.entry(scenario_id).write(scenario);
            self.scenario_next_id.write(scenario_id + 1);
            scenario_id
        }

        fn play(ref self: ContractState, char_id: CharId) {
            if char_id >= self.char_next_id.read() {
                panic!("character does not exist");
            }
            if self.owners.entry(char_id).read() != get_caller_address() {
                panic!("caller is not the owner of the character");
            }
            let challenger = self.challanger.read();
            if challenger.is_none() {
                self.challanger.write(Option::Some(char_id));
            }
            else {
                let winner_char_id = self.duel(self.challanger.read().unwrap(), char_id);
                if winner_char_id != 0 {
                    self.challanger.write(Option::Some(winner_char_id)); 
                }
            }

        }

        fn get_my_characters(self: @ContractState) -> Array<(CharId, felt252, Array<u32>)> {
            let caller_address = get_caller_address();
            let char_ids = self.owner_to_characters.entry(caller_address);
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

        fn get_challenger(self: @ContractState) -> Option<(CharId, felt252, Array<u32>)> {
            let challenger = self.challanger.read();
            match challenger {
                Option::Some(char_id) => {
                    let name = self.characters.entry(char_id).name.read();
                    let mut stats = array![];
                    let self_stats = self.characters.entry(char_id).stats;
                    for j in 0..self_stats.len() {
                        stats.append(self_stats.at(j).read());
                    };
                    Option::Some((char_id, name, stats))
                },
                Option::None => Option::None,
            }
        }
    }
}