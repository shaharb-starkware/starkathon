// use starknet::ContractAddress;

// use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};


// use starkwars::starkwars::StarkWars::{IStarkWarsDispatcher, IStarkWarsDispatcherTrait};

// fn deploy_contract(name: ByteArray) -> ContractAddress {
//     let contract = declare(name).unwrap().contract_class();
//     let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
//     contract_address
// }

// #[test]
// fn test_character_creation() {
//     let contract_address = deploy_contract("StarkWars");
//     let dispatcher = IStarkWarsDispatcher { contract_address };
//     dispatcher.create_character("Ariel", array![1,9,9,4,9,9,4]);
//     let characters = dispatcher.get_my_characters();
//     assert!(characters.len() == 1, "unexpected amount of characters");
//     let (id, name, stats) = characters[0];
//     assert!(id == @1, "unexpected id");
//     assert!(name == @"Ariel", "unexpected name");
//     assert!(stats == @array![1,9,9,4,9,9,4]);

// }

// #[test]
// fn test_increase_balance() {
//     let contract_address = deploy_contract("HelloStarknet");

//     let dispatcher = IHelloStarknetDispatcher { contract_address };

//     let balance_before = dispatcher.get_balance();
//     assert(balance_before == 0, 'Invalid balance');

//     dispatcher.increase_balance(42);

//     let balance_after = dispatcher.get_balance();
//     assert(balance_after == 42, 'Invalid balance');
// }

// #[test]
// #[feature("safe_dispatcher")]
// fn test_cannot_increase_balance_with_zero_value() {
//     let contract_address = deploy_contract("HelloStarknet");

//     let safe_dispatcher = IHelloStarknetSafeDispatcher { contract_address };

//     let balance_before = safe_dispatcher.get_balance().unwrap();
//     assert(balance_before == 0, 'Invalid balance');

//     match safe_dispatcher.increase_balance(0) {
//         Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
//         Result::Err(panic_data) => {
//             assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
//         }
//     };
// }
