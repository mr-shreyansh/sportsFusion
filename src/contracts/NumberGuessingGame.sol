// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./external/ISynthetixCore.sol";
import "../lib/forge-std/src/interfaces/IERC20.sol";
import '../lib/chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol';
import '../lib/chainlink/contracts/src/v0.8/vrf/VRFV2WrapperConsumerBase.sol';

contract FootballBettingGame is VRFV2WrapperConsumerBase {
    
    event MarketRegistered(uint128 indexed marketId);
    event BetPlaced(address indexed bettor, uint256 indexed matchId, uint256 indexed teamId, uint256 amount);
    event MatchAdded(uint256 indexed matchId, uint256 teamA, uint256 teamB);
    event GameResult(uint256 indexed matchId, uint256 winningTeamId);

    error InsufficientLiquidity(uint256 betAmount, uint256 maxBetAmount);
    error BetAlreadyPlaced(address bettor, uint256 matchId);

    ISynthetixCore public synthetix;
    IERC20 public linkToken;
    uint128 public marketId;

    uint256 public ticketCost;
    uint256 public feePercent;
    bool private isDrawing;

    struct Match {
        uint256 teamA;
        uint256 teamB;
        bool exists;
    }

    mapping(uint256 => Match) public matches; // matchId -> Match
    mapping(uint256 => mapping(uint256 => address[])) public matchBets; // matchId -> teamId -> bettors
    mapping(address => mapping(uint256 => bool)) public userBets; // user -> matchId -> bet status
    mapping(uint256 => uint256) private requestIdToMatchId;

    constructor(
        ISynthetixCore _synthetix,
        address link,
        address vrf, 
        uint256 _ticketCost, 
        uint256 _feePercent
    ) VRFV2WrapperConsumerBase(link, vrf) {
        synthetix = _synthetix;
        linkToken = IERC20(link);
        ticketCost = _ticketCost;
        feePercent = _feePercent;
    }

    function registerMarket() external {
        if (marketId == 0) {
            marketId = synthetix.registerMarket(address(this));
            emit MarketRegistered(marketId);
        }
    }

    function addMatch(uint256 matchId, uint256 teamA, uint256 teamB) external {
        require(!matches[matchId].exists, "Match already exists");

        matches[matchId] = Match({
            teamA: teamA,
            teamB: teamB,
            exists: true
        });

        emit MatchAdded(matchId, teamA, teamB);
    }

    function placeBet(uint256 matchId, uint256 teamId) external {
        require(matches[matchId].exists, "Match does not exist");
        require(teamId == matches[matchId].teamA || teamId == matches[matchId].teamB, "Invalid team for this match");
        require(!userBets[msg.sender][matchId], "Bet already placed for this match");

        address[] storage bettors = matchBets[matchId][teamId];
        uint256 maxParticipants = getMaxBetParticipants();

        if (bettors.length >= maxParticipants) {
            revert InsufficientLiquidity(ticketCost, maxParticipants);
        }

        IERC20(synthetix.getUsdToken()).transferFrom(msg.sender, address(this), ticketCost);
        bettors.push(msg.sender);
        userBets[msg.sender][matchId] = true;

        emit BetPlaced(msg.sender, matchId, teamId, ticketCost);
    }

    function getMaxBetParticipants() public view returns (uint256) {
        return synthetix.getWithdrawableMarketUsd(marketId) / ticketCost;
    }

    function fetchGameResult(uint256 matchId, uint256 maxLinkCost) external {
        require(!isDrawing, "Draw already in progress");
        require(matches[matchId].exists, "Match does not exist");

        linkToken.transferFrom(msg.sender, address(this), maxLinkCost);

        uint256 requestId = requestRandomness(
            500000, // max callback gas
            0, // min confirmations
            1 // number of random values
        );

        requestIdToMatchId[requestId] = matchId;

        isDrawing = true;
    }

    function finishDraw(uint256 matchId, uint256 winningTeamId) internal {
        address[] storage winners = matchBets[matchId][winningTeamId];

        IERC20 usdToken = IERC20(synthetix.getUsdToken());
        uint256 prize = usdToken.balanceOf(address(this)) / winners.length;

        for (uint i = 0; i < winners.length; i++) {
            usdToken.transfer(winners[i], prize);
        }

        emit GameResult(matchId, winningTeamId);

        isDrawing = false;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 matchId = requestIdToMatchId[requestId];
        Match memory matchInfo = matches[matchId];
        uint256 winningTeamId = (randomWords[0] % 2 == 0) ? matchInfo.teamA : matchInfo.teamB;
        finishDraw(matchId, winningTeamId);
    }

    function name(uint128 _marketId) external view returns (string memory n) {
        if (_marketId == marketId) {
            n = string(abi.encodePacked("Market ", bytes32(uint256(_marketId))));
        }
    }

    function reportedDebt(uint128) external pure returns (uint256) {
        return 0;
    }

    function minimumCredit(uint128 _marketId) external view returns (uint256 l) {
        if (_marketId == marketId) {
            if (isDrawing) {
                l = type(uint).max;
            }
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return interfaceId == this.supportsInterface.selector;
    }
}
