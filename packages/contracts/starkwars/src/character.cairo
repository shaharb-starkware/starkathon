use core::starknet::storage::Vec;

#[starknet::storage_node]
pub struct Character {
    pub name: ByteArray,
    pub stats: Vec<u32>,
}
