#[derive(Drop, Serde, starknet::Store)]
pub struct Scenario {
    pub name: ByteArray,
    pub required_stat: u64,
    pub min_value: u32
}

// impl ScenarioZero of core::num::traits::Zero<Scenario> {
//     fn zero() -> Scenario nopanic {
//         Scenario { name: "", required_stat: 0, min_value: 0, id: 0 }
//     }
//     fn is_zero(self: @Scenario) -> bool {
//         self.id.is_zero()
//     }
//     fn is_non_zero(self: @Scenario) -> bool {
//         self.id.is_non_zero()
//     }
// }