import React, { useState } from "react";
import { useAccount, useChainId, useConnect, useDisconnect } from "wagmi";
import WalletConnectPopup from "@/components/customWalletConnectButton/walletConnectPopup";
import CustomWalletConnectButton from "@/components/customWalletConnectButton";
import { FootballFusionContract } from "../../contracts/FootballBettingGame";
import { ethers } from "ethers";
import { Contract } from "ethers";
const Home = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const SFConfig = FootballFusionContract;

  const [matchId, setMatchId] = useState(0);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [team, setTeam] = useState("");
  const [matchList, setMatchList] = useState<any[]>([]);

  async function registerMarket() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract: any = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );
      // const gasEstimate = await contract.estimateGas['registerMarket']();
      const tx = await contract.registerMarket({ gasLimit: 3000000 });
      await tx.wait();
      console.log(`market Registered`);
    } catch (error) {
      console.error("Error registering market:", error);
    }
  }

  async function getMatches() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );
      let totalMatches = await contract.totalmatches();
      totalMatches = ethers.utils.formatUnits(totalMatches, 0);
      console.log("total", totalMatches);
      const matches = [];

      for (let i = 0; i < totalMatches; i++) {
        const match = await contract.matches(i);
        matches.push(match);
      }
      setMatchList(matches);

      console.log("match list", matches);
    } catch (error) {
      console.error("Error adding match:", error);
    }
  }
  async function addMatch(matchId: any, teamA: any, teamB: any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );
      const tx = await contract.addMatch(teamA, teamB);
      await tx.wait();
      console.log(
        `Match added: Match ID = ${matchId}, Team A = ${teamA}, Team B = ${teamB}`
      );
    } catch (error) {
      console.error("Error adding match:", error);
    }
  }

  async function placeBet(matchId: any, teamId: any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );
      // const _matchId = ethers.utils.parseUnits(String(matchId), 0);
      const estimateGas = contract.estimateGas.placeBet(matchId,teamId)
      const tx = await contract.placeBet(matchId, teamId, {gasLimit:300000});
      await tx.wait();
      console.log(`Bet placed: Match ID = ${matchId}, Team ID = ${teamId}`);
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  }

  async function fetchGameResult(matchId: any, maxLinkCost: any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );

      const tx = await contract.fetchGameResult(
        matchId,
        ethers.utils.parseUnits(maxLinkCost.toString(), "ether")
      );
      await tx.wait();
      console.log(`Game result fetched for Match ID = ${matchId}`);
    } catch (error) {
      console.error("Error fetching game result:", error);
    }
  }

  return (
    <div className="text-black">
      <button
        onClick={() => {
          connect;
        }}
      >
        connect:{status}
        {chainId}
        {SFConfig.address}
      </button>
      <div>account:{account.address}</div>
      <button
        onClick={() => {
          registerMarket();
        }}
        className="text-red-400 border rounded-lg p-2"
      >
        Register Market
      </button>

      <div className="flex flex-col gap-2 p-3 max-w-[500px]">
        <input
          onChange={(e) => {
            setTeamA(String(e.target.value));
          }}
          placeholder="Team A"
          className="bg-white rounded-lg p-2 outline-none"
        />
        <input
          onChange={(e) => {
            setTeamB(String(e.target.value));
          }}
          placeholder="Team B"
          className="bg-white rounded-lg p-2 outline-none"
        />
        <button
          onClick={() => {
            addMatch(matchId, teamA, teamB);
          }}
          className="text-white bg-violet-400 rounded-lg p-2 text-[20px]"
        >
          Add match
        </button>
      </div>
     
      <button
        onClick={() => {
          getMatches();
        }}
        className="text-white mx-3 bg-violet-400 rounded-lg p-2 text-[20px]"
      >
        Get Matches
      </button>
      <div className="min-w-[300px] w-fit border p-3 rounded-lg m-3">
        <div className="text-white border-b-2 mb-2">
          Select your team from the below matches
        </div>
        {matchList &&
          matchList?.map((match) => {
            return (
              <div className="text-white flex gap-3 p-2 justify-between">
                <button onClick={()=>{placeBet(match?.matchId,match?.teamA)}}  className="flex w-[300px] border rounded-lg p-2 hover:bg-purple-400 transition-all">
                  {match?.teamAName}
                  <div>{/* {ethers.utils.formatUnits(match?.teamA,0)} */}</div>
                </button>
                <button onClick={()=>{placeBet(0,1)}} className="flex w-[300px] border rounded-lg p-2 hover:bg-purple-400 transition-all">
                  {match?.teamBName}
                  <div>{/* {ethers.utils.formatUnits(match?.teamB,0)} */}</div>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
