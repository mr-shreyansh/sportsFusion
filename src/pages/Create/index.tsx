import { useCreateContext } from "@/components/CreateContext/createContext";
import React, { useState } from "react";

const Create = () => {
  const {
    tokenAddress,
    setTokenAddress,
    tokenName,
    setTokenName,
    tokenSymbol,
    setTokenSymbol,
    tokenValue,
    setTokenValue,
    usdtValue,
    setUsdtValue,
    symboiteName,
    setSymboiteName,
    symboiteSymbol,
    setSymboiteSymbol,
  } = useCreateContext();

  const [transactionHash, setTransactionHash] = useState<any>('asdf');

  const handleCreate = () => {
    try {
    } catch (err) {
      console.log("error in creating Symboite", err);
    }
  };
  return (
    <div>
      <div className="w-full p-4 flex justify-center text-[24px] bg-gradient-to-tr from-sky-500 to-violet-500 text-greys-900 ">Create Symboite with a few simple steps</div>
      <div className="flex justify-around p-4">
        <div className="flex flex-col gap-4 border border-greys-900 p-4 rounded-lg">
          <ul className="text-greys-200 bg-greys-900 p-2 rounded-lg">
            🚀 Give a name and symbol to your Symboite
          </ul>
          <ul className="text-greys-200 bg-greys-900 p-2 rounded-lg">
            🚀 Enter your Token details that you want to add in Symboisis{" "}
          </ul>
          <ul className="text-greys-200 bg-greys-900 p-2 rounded-lg">
            🚀 Enter Token value and USDT value to Deposite in the Symboite
            Contract{" "}
          </ul>
        </div>
        <form className="flex flex-col gap-2 p-3 border w-fit rounded-lg border-greys-900 ">
          <div className="">
            <input
              onChange={(e) => setSymboiteName(e.target.value)}
              placeholder="Symbiote Name"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setSymboiteSymbol(e.target.value)}
              placeholder="Symbiote Symbol"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Token Name"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="Token Symbol"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Token Address"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setTokenValue(e.target.value)}
              placeholder="Token Value"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <div className="">
            <input
              onChange={(e) => setUsdtValue(e.target.value)}
              placeholder="USDT Value"
              className="py-2 px-4 placeholder:text-greys-500 placeholder:text-[18px] rounded-lg outline-none focus:border-[1px] focus:border-l-violet-400 focus:border-b-violet-500  focus:border-r-violet-200 focus:border-t-violet-300 "
            />
          </div>
          <button
            onClick={() => {
              handleCreate();
            }}
            className="border rounded-lg p-2 hover:border-violet-400 hover:text-violet-400 hover:bg-violet-100/10 transition-all"
          >
            Create Symboite
          </button>
        </form>
      </div>

      {
        transactionHash && (
          <div className="flex flex-col m-4 bg-gradient-to-br from-sky-600 to-violet-500 border border-greys-900 rounded-lg p-3">
            <h1 className="w-full text-center text-[22px]">🎉 Transaction Successfull 🎉</h1>
          <div className="flex flex-col">
              <h1>
                {transactionHash}
              </h1>
              <a className="">
                Open
              </a>
          </div>

          </div>
        )
      }
    </div>
  );
};

export default Create;
