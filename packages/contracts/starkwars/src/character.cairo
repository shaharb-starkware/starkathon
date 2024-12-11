use core::starknet::storage::Vec;
    
#[starknet::storage_node]
pub struct Character {
    pub name: felt252,
    pub stats: Vec<u32>,
}
