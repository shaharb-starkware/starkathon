import { Abi } from '@starknet-react/core';

/// A prefix to be added to the src path of resources (images, etc.) in order to correctly load them.
/// Production mode is when deploying the app to a server, github pages in our case.
export const SrcPrefix =
  import.meta.env.MODE === 'production' ? '/catering-app' : '';

/// The address of the deployed contract.
export const CONTRACT_ADDRESS =
  '0x0313650fdd62f68cc3ca6648037508e6ab7dc7336959ebd8c05e624db8d64038';
/// The ABI of the deployed contract. Can be found on starkscan.
/// For the above contract, the ABI can be found at:
/// https://sepolia.starkscan.co/contract/0x049c75609bb077a9427bc26a9935472ec75e5508ed216ef7f7ad2693397deebc
/// And the ABI is accessible under the 'Class Code/History' tab -> 'Copy ABI Code' button.
export const ABI = [
  {
    "name": "WorldStateImpl",
    "type": "impl",
    "interface_name": "starkwars::state::State::WorldStateTrait"
  },
  {
    "name": "core::byte_array::ByteArray",
    "type": "struct",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "starkwars::scenario::Scenario",
    "type": "struct",
    "members": [
      {
        "name": "name",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "required_stat",
        "type": "core::integer::u32"
      },
      {
        "name": "min_value",
        "type": "core::integer::u32"
      },
      {
        "name": "id",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "starkwars::state::State::WorldStateTrait",
    "type": "interface",
    "items": [
      {
        "name": "create_character",
        "type": "function",
        "inputs": [
          {
            "name": "stats",
            "type": "core::array::Array::<core::integer::u32>"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "external"
      },
      {
        "name": "add_scenario",
        "type": "function",
        "inputs": [
          {
            "name": "scenario",
            "type": "starkwars::scenario::Scenario"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "play",
        "type": "function",
        "inputs": [
          {
            "name": "char_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_my_characters",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<(core::felt252, core::array::Array::<core::integer::u32>)>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "starkwars::state::State::Event",
    "type": "event",
    "variants": []
  }
] as const satisfies Abi;
