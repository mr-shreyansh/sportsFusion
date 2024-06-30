import { useInvestContext } from '@/components/InvestContext/investContext';
import React from 'react'

export const SymbiotesList = () => {
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
      } = useInvestContext();
  return (
    <div className="flex flex-col gap-3 w-fit p-4 h-screen overflow-scroll scrollbar-thin  overflow-x-hidden  ">
        {symbiotesList &&
          symbiotesList.map((item: any) => {
            return (
              <div className="flex flex-col gap-3 p-3 border border-violet-400 rounded-lg">
                <h1 className="text-[24px] flex items-center gap-3">
                  {item?.symbioteName}{" "}
                  <span className="text-[10px] bg-dark-secondary p-[3px] rounded-md">
                    {item?.symbioteSymbol}
                  </span>
                </h1>
                <div>
                  <h1 className="text-greys-500">Symbiote Token Address</h1>
                  <h1>{item?.address}</h1>
                </div>{" "}
                <div>
                  <h1 className="text-greys-500">Underlying Token:</h1>
                  <h1 className="text-[24px] flex items-center gap-3">
                    {item?.tokenName}{" "}
                    <span className="text-[10px] bg-dark-secondary p-[3px] rounded-md">
                      {item?.tokenSymbol}
                    </span>
                  </h1>
                </div>{" "}
                <h1 className="text-[24px] font-semibold text-greys-500">
                  Total Supply:{" "}
                  <span className="font-thin text-[20px] text-white">
                    {item?.totalSupply}
                  </span>
                </h1>
                <button
                  onClick={() => {
                    setSelectedSymbiote(item);
                  }}
                  className="border border-greys-900 bg-violet-500 hover:bg-primary-black hover:border-violet-500 transition-all text-white flex w-fit  px-3 py-1 rounded-lg"
                >
                  Invest
                </button>
              </div>
            );
          })}
      </div>
  )
}
