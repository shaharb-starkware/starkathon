import { Abi } from '@starknet-react/core';

/// A prefix to be added to the src path of resources (images, etc.) in order to correctly load them.
/// Production mode is when deploying the app to a server, github pages in our case.
export const SrcPrefix =
  import.meta.env.MODE === 'production' ? '/catering-app' : '';

/// The address of the deployed contract.
export const CONTRACT_ADDRESS =
  '0x03f6439d882e01df5a686725295cacbb824178b36a14dad9688b99464c6f2224';
/// The ABI of the deployed contract. Can be found on starkscan.
/// For the above contract, the ABI can be found at:
/// https://sepolia.starkscan.co/contract/0x049c75609bb077a9427bc26a9935472ec75e5508ed216ef7f7ad2693397deebc
/// And the ABI is accessible under the 'Class Code/History' tab -> 'Copy ABI Code' button.
export const ABI = [
  {
    "name": "StarkWarsImpl",
    "type": "impl",
    "interface_name": "starkwars::starkwars::StarkWars::StarkWarsTrait"
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
        "name": "stat1",
        "type": "core::integer::u64"
      },
      {
        "name": "min_value1",
        "type": "core::integer::u32"
      },
      {
        "name": "stat2",
        "type": "core::integer::u64"
      },
      {
        "name": "min_value2",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "core::option::Option::<(core::integer::u32, core::byte_array::ByteArray, core::array::Array::<core::integer::u32>)>",
    "type": "enum",
    "variants": [
      {
        "name": "Some",
        "type": "(core::integer::u32, core::byte_array::ByteArray, core::array::Array::<core::integer::u32>)"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "name": "starkwars::starkwars::StarkWars::StarkWarsTrait",
    "type": "interface",
    "items": [
      {
        "name": "create_character",
        "type": "function",
        "inputs": [
          {
            "name": "name",
            "type": "core::byte_array::ByteArray"
          },
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
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
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
            "type": "core::array::Array::<(core::integer::u32, core::byte_array::ByteArray, core::array::Array::<core::integer::u32>)>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "foo_get_my_characters",
        "type": "function",
        "inputs": [
          {
            "name": "caller_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<(core::integer::u32, core::byte_array::ByteArray, core::array::Array::<core::integer::u32>)>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_challenger",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::option::Option::<(core::integer::u32, core::byte_array::ByteArray, core::array::Array::<core::integer::u32>)>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "name": "OwnableImpl",
    "type": "impl",
    "interface_name": "openzeppelin_access::ownable::interface::IOwnable"
  },
  {
    "name": "openzeppelin_access::ownable::interface::IOwnable",
    "type": "interface",
    "items": [
      {
        "name": "owner",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "transfer_ownership",
        "type": "function",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "renounce_ownership",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": []
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "OwnershipTransferred",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        "kind": "nested",
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "starkwars::starkwars::StarkWars::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "OwnableEvent",
        "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event"
      }
    ]
  }
] as const satisfies Abi;
