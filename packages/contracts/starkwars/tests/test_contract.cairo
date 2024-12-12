use starknet::ContractAddress;

use snforge_std::{cheat_caller_address, CheatSpan, ContractClassTrait, declare, DeclareResultTrait};

use starkwars::interface::{IStarkWarsDispatcher, IStarkWarsDispatcherTrait};

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_character_creation() {
    let contract_address = deploy_contract("StarkWars");
    let dispatcher = IStarkWarsDispatcher { contract_address };
    let characters = dispatcher.get_my_characters();
    assert!(characters.len() == 1, "unexpected amount of characters");
    cheat_caller_address(contract_address, 0x123.try_into().unwrap(), CheatSpan::Indefinite);
    dispatcher.create_character("Ariel", array![1,9,9,4,9,9,4]);
    let characters = dispatcher.get_my_characters();
    assert!(characters.len() == 1, "unexpected amount of characters");
    let (id, name, stats) = characters[0];
    assert!(id == @1, "unexpected id");
    assert!(name == @"Ariel", "unexpected name");
    assert!(stats == @array![1,9,9,4,9,9,4]);

}

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