// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./external/ISynthetixCore.sol";
import "../lib/forge-std/src/interfaces/IERC20.sol";

contract SportsBettingGame {
    
    event MarketRegistered(uint128 indexed marketId);
    event BetPlaced(address indexed bettor, uint256 indexed matchId, uint256 indexed teamId, uint256 amount);
    event MatchAdded(uint256 indexed matchId, string teamA, string teamB);
    event GameResult(uint256 indexed matchId, uint256 winningTeamId);

    error InsufficientLiquidity(uint256 betAmount, uint256 maxBetAmount);
    error BetAlreadyPlaced(address bettor, uint256 matchId);
    error NotMatchCreator(address caller);

    ISynthetixCore public synthetix;
    uint128 public marketId;

    uint256 public ticketCost;
    uint256 public feePercent;

    struct Match {
        uint256 teamA;
        uint256 teamB;
        string teamAName;
        string teamBName;
        bool exists;
        address creator;
        bool isDecided;
        uint256 winningTeamId;
    }

    Match[] public matches;
    mapping(uint256 => mapping(uint256 => address[])) public matchBets; // matchId -> teamId -> bettors
    mapping(address => mapping(uint256 => bool)) public userBets; // user -> matchId -> bet status

    constructor(
        ISynthetixCore _synthetix,
        uint256 _ticketCost,
        uint256 _feePercent
    ) {
        synthetix = _synthetix;
        ticketCost = _ticketCost;
        feePercent = _feePercent;
    }

    function registerMarket() external {
        if (marketId == 0) {
            marketId = synthetix.registerMarket(address(this));
            emit MarketRegistered(marketId);
        }
    }

    function addMatch(string memory teamAName, string memory teamBName) external returns (uint256 matchId) {
        matches.push(Match({
            teamA: matches.length,
            teamB: matches.length + 1,
            teamAName: teamAName,
            teamBName: teamBName,
            exists: true,
            creator: msg.sender,
            isDecided: false,
            winningTeamId: 0
        }));
        matchId = matches.length - 1;
        emit MatchAdded(matchId, teamAName, teamBName);
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

    function declareWinner(uint256 matchId, uint256 winningTeamId) external {
        require(matches[matchId].exists, "Match does not exist");
        require(matches[matchId].creator == msg.sender, "Only match creator can declare the winner");
        require(winningTeamId == matches[matchId].teamA || winningTeamId == matches[matchId].teamB, "Invalid winning team");
        require(!matches[matchId].isDecided, "Match result already declared");

        matches[matchId].isDecided = true;
        matches[matchId].winningTeamId = winningTeamId;
        distributePrizes(matchId, winningTeamId);

        emit GameResult(matchId, winningTeamId);
    }

    function distributePrizes(uint256 matchId, uint256 winningTeamId) internal {
        address[] storage winners = matchBets[matchId][winningTeamId];

        IERC20 usdToken = IERC20(synthetix.getUsdToken());
        uint256 prize = usdToken.balanceOf(address(this)) / winners.length;

        for (uint i = 0; i < winners.length; i++) {
            usdToken.transfer(winners[i], prize);
        }
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
            if (matches[_marketId].isDecided) {
                l = type(uint).max;
            }
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return interfaceId == this.supportsInterface.selector;
    }
}
