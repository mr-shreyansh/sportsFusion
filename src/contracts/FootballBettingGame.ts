export const FootballFusionContract = {
    address:'0x5c2750e0b1DD98daFd0608319A3bD1410159986b',
    abi:[
      {
        "inputs": [
          {
            "internalType": "contract ISynthetixCore",
            "name": "_synthetix",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_ticketCost",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_feePercent",
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
            "name": "bettor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          }
        ],
        "name": "BetAlreadyPlaced",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "betAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxBetAmount",
            "type": "uint256"
          }
        ],
        "name": "InsufficientLiquidity",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "caller",
            "type": "address"
          }
        ],
        "name": "NotMatchCreator",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "bettor",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "teamId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "BetPlaced",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "winningTeamId",
            "type": "uint256"
          }
        ],
        "name": "GameResult",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint128",
            "name": "marketId",
            "type": "uint128"
          }
        ],
        "name": "MarketRegistered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "teamA",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "teamB",
            "type": "string"
          }
        ],
        "name": "MatchAdded",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "teamAName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "teamBName",
            "type": "string"
          }
        ],
        "name": "addMatch",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "winningTeamId",
            "type": "uint256"
          }
        ],
        "name": "declareWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "feePercent",
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
        "name": "getMaxBetParticipants",
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
        "name": "marketId",
        "outputs": [
          {
            "internalType": "uint128",
            "name": "",
            "type": "uint128"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "matchBets",
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
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "matches",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "teamA",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "teamB",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "teamAName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "teamBName",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isDecided",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "winningTeamId",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint128",
            "name": "_marketId",
            "type": "uint128"
          }
        ],
        "name": "minimumCredit",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "l",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint128",
            "name": "_marketId",
            "type": "uint128"
          }
        ],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "n",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "matchId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "teamId",
            "type": "uint256"
          }
        ],
        "name": "placeBet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "registerMarket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint128",
            "name": "",
            "type": "uint128"
          }
        ],
        "name": "reportedDebt",
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
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "synthetix",
        "outputs": [
          {
            "internalType": "contract ISynthetixCore",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ticketCost",
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
        "name": "totalmatches",
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
            "name": "",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "userBets",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
}