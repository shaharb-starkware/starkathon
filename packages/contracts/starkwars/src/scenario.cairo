#[derive(Drop, Serde, starknet::Store)]
pub struct Scenario {
    pub name: ByteArray,
    pub required_stat: u32,
    pub min_value: u32,
    pub id: u32
}