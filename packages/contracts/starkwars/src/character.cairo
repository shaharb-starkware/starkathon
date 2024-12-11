use core::starknet::storage::Vec;
    
#[starknet::storage_node]
pub struct Character {
    pub stats: Vec<u32>,
}