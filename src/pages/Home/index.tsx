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
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [team, setTeam] = useState('');

  async function registerMarket() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract:any = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );
      // const gasEstimate = await contract.estimateGas['registerMarket']();
      const tx = await contract.registerMarket({gasLimit:3000000});
      await tx.wait();
      console.log(`market Registered`);
    } catch (error) {
      console.error("Error registering market:", error);
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

  async function placeBet(matchId: any, teamId: any, ticketCost: any) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        SFConfig.address,
        SFConfig.abi,
        signer
      );

      const tx = await contract.placeBet(matchId, teamId, {
        value: ethers.utils.parseUnits(ticketCost.toString(), "ether"),
      });
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
      <button onClick={()=>{registerMarket()}} className="text-red-400 border rounded-lg p-2">
        Register Market
      </button>

      <div className="flex flex-col gap-2 p-3 max-w-[500px]">
        <input onChange={(e)=>{setTeamA(String(e.target.value))}} placeholder="Team A" className="bg-white rounded-lg p-2 outline-none"/>
        <input onChange={(e)=>{setTeamB(String(e.target.value))}} placeholder="Team B" className="bg-white rounded-lg p-2 outline-none"/>
        <button onClick={()=>{addMatch(matchId,teamA,teamB)}}>Add match</button>
      </div>
      <div className="flex flex-col gap-2 p-3 max-w-[500px]">
        <input onChange={(e)=>{setMatchId(Number(e.target.value))}} placeholder="Match ID" className="bg-white rounded-lg p-2 outline-none"/>
        <input onChange={(e)=>{setTeam(String(e.target.value))}} placeholder="Team A" className="bg-white rounded-lg p-2 outline-none"/>
        <button onClick={()=>{placeBet(matchId,team,1)}}>Add match</button>
      </div>
    </div>
  );
};

export default Home;
