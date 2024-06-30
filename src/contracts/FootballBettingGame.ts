export const FootballFusionContract = {
    address:'0x66BAbF71C876f217b4FAB60b8328B371542863a1',
    abi:[
        {
          "inputs": [
            {
              "internalType": "contract ISynthetixCore",
              "name": "_synthetix",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "link",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "vrf",
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
              "internalType": "uint256",
              "name": "teamA",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "teamB",
              "type": "uint256"
            }
          ],
          "name": "MatchAdded",
          "type": "event"
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
              "name": "teamA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "teamB",
              "type": "uint256"
            }
          ],
          "name": "addMatch",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "matchId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxLinkCost",
              "type": "uint256"
            }
          ],
          "name": "fetchGameResult",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "name": "linkToken",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
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
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_requestId",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "_randomWords",
              "type": "uint256[]"
            }
          ],
          "name": "rawFulfillRandomWords",
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