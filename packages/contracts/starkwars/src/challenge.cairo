#[derive(Clone, Drop, Serde, starknet::Store)]
pub struct Challenge {
    pub name: ByteArray,
    pub stat1: u64,
    pub min_value1: u32,
    pub stat2: u64,
    pub min_value2: u32,
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

