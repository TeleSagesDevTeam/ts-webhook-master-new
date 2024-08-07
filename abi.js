module.exports = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_protocolFeeDestination",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_protocolFeePercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_subjectFeePercent",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "trader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "subject",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isBuy",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "keyAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "protocolEthAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "subjectEthAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "supply",
        "type": "uint256"
      }
    ],
    "name": "Trade",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "buyKeys",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "enum PriceCurve",
        "name": "priceCurve",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "multiPriceParam",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "flatPriceParam",
        "type": "uint256"
      }
    ],
    "name": "createPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getBuyPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getBuyPriceAfterFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum PriceCurve",
        "name": "priceCurve",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "multiPriceParam",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "flatPriceParam",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "supply",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getCurvePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getSellPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getSellPriceAfterFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "pools",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "enum PriceCurve",
        "name": "priceCurve",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "multiPriceParam",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "flatPriceParam",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "supply",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "protocolFeeDestination",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "protocolFeePercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "keySubject",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "poolIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "keyIdentifiers",
        "type": "string[]"
      }
    ],
    "name": "sellKeys",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeDestination",
        "type": "address"
      }
    ],
    "name": "setFeeDestination",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_feePercent",
        "type": "uint256"
      }
    ],
    "name": "setProtocolFeePercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_feePercent",
        "type": "uint256"
      }
    ],
    "name": "setSubjectFeePercent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "subjectFeePercent",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]