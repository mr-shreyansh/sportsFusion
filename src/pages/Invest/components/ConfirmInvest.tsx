import { useInvestContext } from "@/components/InvestContext/investContext";
import React, { useEffect, useState } from "react";
import CoinsListPopup from "./CoinsList";

const ConfirmInvest = () => {
  const {
    symbiotesList,
    setSymbiotesList,
    selectedSymbiote,
    setSelectedSymbiote,
    awardType,
    setAwardType,
    tokenAmount,
    setTokenAmount,
    tokenDeposite,
    setTokenDeposite,
    showCoinsList,
    setShowCoinsList,
    token
  }:any = useInvestContext();

  
  const coinsList = [
    {
        name:'USDT',
        address:'x03kh280dl17sh1',
        symbol:'USDT',
        balance:100
    },
    {
        name:'USDC',
        address:'x03kh280dl17sh1',
        symbol:'USDC',
        balance:100
    },
    {
        name:'DAI',
        address:'x03kh280dl17sh1',
        symbol:'DAI',
        balance:100
    }
  ]




  useEffect(() => {
   
  }, []);

  return (
    <div className="flex flex-col gap-3 h-screen w-1/3 p-3 border-r border-r-violet-500  ">
      {selectedSymbiote ? (
        <div className="p-3 border border-greys-900 rounded-lg flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="bg-violet-500 p-2 rounded-lg text-dark-primary"><span className="text-greys-900">Symbiote: </span>{selectedSymbiote.symbioteName}</h1>
            <h1 className="bg-violet-500 p-2 rounded-lg text-dark-primary"><span className="text-greys-900">Address: </span>{selectedSymbiote.address}</h1>
          </div>
            <button onClick={()=>setShowCoinsList(true)} className="border rounded-md p-1 text-violet-500 border-violet-500" >
                Coins List
            </button>
               <CoinsListPopup />
            <div className="flex flex-col w-full gap-2">
              <h1>{token?.name || 'Select a token'}</h1>
            <input
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="Enter Token Amount"
              className="py-2 px-4 border border-greys-900 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
            <button onClick={()=>{}} className="border border-greys-900 rounded-md bg-violet-500 p-1 px-2">
              Mint
            </button>
            </div>
        </div>
      ):
      (
        <div className="p-3 border border-greys-900 rounded-lg flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="bg-violet-500/50 p-2 rounded-lg text-dark-primary"><span className="text-greys-900">Symbiote: </span>{'------'}</h1>
            <h1 className="bg-violet-500/50 p-2 rounded-lg text-dark-primary"><span className="text-greys-900">Address: </span>{'------'}</h1>
          </div>
            <button onClick={()=>setShowCoinsList(true)} className="border rounded-md p-1 text-violet-500 border-violet-500" >
                Coins List
            </button>
               <CoinsListPopup />
            <div className="flex flex-col w-full gap-2">
              <h1>{token?.name || 'Select a token'}</h1>
            <input
              // onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="Enter Token Amount"
              className="py-2 px-4 border border-greys-900 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
            <button className="border border-greys-900 rounded-md bg-greys-500/10 p-1 px-2">
              Mint
            </button>
            </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-violet-400 text-[16px] bg-violet-50/20 rounded-lg p-2">👉 Mint Symboit Tokens</h1>
        <h1 className="text-violet-400 text-[16px] bg-violet-50/20 rounded-lg p-2">👉 Get yield on the tokens while you hold the tokens as defined thier laws</h1>
        <h1 className="text-violet-400 text-[16px] bg-violet-50/20 rounded-lg p-2">👉 You can choose to redeem with underlying token and USDT </h1>
        <h1 className="text-violet-400 text-[16px] bg-violet-50/20 rounded-lg p-2">👉 Redeeming using underlying token will provide more benefits</h1>
      </div>
    </div>
  );
};

export default ConfirmInvest;
