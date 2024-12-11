#[starknet::contract]
pub mod Starkwars {
    use starknet::storage::MutableVecTrait;
    use starknet::storage::VecTrait;
    use starknet::storage::StoragePathEntry;
    use starknet::get_caller_address;
    use crate::scenario::Scenario;
    use core::starknet::storage::{Map, Vec};
    use crate::character::Character;
    use core::starknet::ContractAddress;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::storage::{StorageMapReadAccess, StorageMapWriteAccess};

    type CharId = u32;
    type ScenarioId = u32;


    #[storage]
    struct Storage {
        scenarios: Map<ScenarioId, Option<Scenario>>,
        characters: Map<CharId, Character>,
        owners: Map<CharId, ContractAddress>,
        owner_to_characters: Map<ContractAddress, Vec<CharId>>,
        challanger: CharId,
        next_id: CharId
    }

    #[starknet::interface]
    pub trait WorldStateTrait<TState> {
        fn create_character(ref self: TState, name: felt252, stats: Array<u32>) -> CharId;
        fn add_scenario(ref self: TState, scenario: Scenario);
        fn play(ref self: TState, char_id: CharId);
        fn get_my_characters(self: @TState) -> Array<(CharId, felt252, Array<u32>)>;
    }

    #[abi(embed_v0)]
    impl WorldStateImpl of WorldStateTrait<ContractState> {
        fn create_character(ref self: ContractState, name: felt252, stats: Array<u32>) -> CharId {
            let caller_address = get_caller_address();
            let char_id = self.next_id.read();
            self.characters.entry(char_id).name.write(name);
            for stat in stats {
                self.characters.entry(char_id).stats.append().write(stat);
            };

            self.owners.entry(char_id).write(caller_address);
            self.owner_to_characters.entry(caller_address).append().write(char_id);

            self.next_id.write(char_id + 1);
            char_id
        }

        fn add_scenario(ref self: ContractState, scenario: Scenario) {
            match self.scenarios.read(scenario.id) {
                Option::None => {
                    self.scenarios.write(scenario.id, Option::Some(scenario));
                },
                Option::Some(_) => {
                    panic!("cannot override scenario")
                }
            }

        }

        fn play(ref self: ContractState, char_id: CharId) {
            
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
    }
}
