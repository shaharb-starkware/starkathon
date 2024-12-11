#[starknet::contract]
pub mod State {
    use starknet::storage::MutableVecTrait;
    use starknet::storage::StoragePathEntry;
    use crate::scenario::Scenario;
    use core::starknet::storage::Map;
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
        challanger: CharId,
        next_id: CharId
    }

    #[starknet::interface]
    pub trait WorldStateTrait<TState> {
        fn create_character(ref self: TState, stats: Array<u32>) -> CharId;
        fn add_scenario(ref self: TState, scenario: Scenario);
        fn play(ref self: TState, char_id: CharId);
    }

    #[abi(embed_v0)]
    impl WorldStateImpl of WorldStateTrait<ContractState> {
        fn create_character(ref self: ContractState, stats: Array<u32>) -> CharId {
            let char_id = self.next_id.read();
            for stat in stats {
                self.characters.entry(char_id).stats.append().write(stat);
            };
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
    }
}