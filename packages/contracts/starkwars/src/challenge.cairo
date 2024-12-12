#[derive(Clone, Drop, Serde, starknet::Store)]
pub struct Challenge {
    pub name: ByteArray,
    pub stat1: u64,
    pub min_value1: u32,
    pub stat2: u64,
    pub min_value2: u32,
}
