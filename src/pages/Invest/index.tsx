import { useInvestContext } from "@/components/InvestContext/investContext";
import React, { useEffect } from "react";
import ConfirmInvest from "./components/ConfirmInvest";
import { SymbiotesList } from "./components/SymbiotesList";

const Invest = () => {
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
  const dataList = [
    {
      address: "x01382791jd79eks729mb",
      tokenName: "token1",
      tokenSymbol: "TOK",
      symbioteName: "sym1",
      symbioteSymbol: "SYM",
      totalSupply: "5",
    },
    {
      address: "x02382791jd79eks729mb",
      tokenName: "token2",
      tokenSymbol: "TOK2",
      symbioteName: "sym2",
      symbioteSymbol: "SYM2",
      totalSupply: "10",
    },
    {
      address: "x03382791jd79eks729mb",
      tokenName: "token3",
      tokenSymbol: "TOK3",
      symbioteName: "sym3",
      symbioteSymbol: "SYM3",
      totalSupply: "15",
    },
    {
      address: "x04382791jd79eks729mb",
      tokenName: "token4",
      tokenSymbol: "TOK4",
      symbioteName: "sym4",
      symbioteSymbol: "SYM4",
      totalSupply: "20",
    },
    {
      address: "x05382791jd79eks729mb",
      tokenName: "token5",
      tokenSymbol: "TOK5",
      symbioteName: "sym5",
      symbioteSymbol: "SYM5",
      totalSupply: "25",
    },
  ];

  const getSymbiotesList = async () => {
    try {
      setSymbiotesList(dataList);
      if(symbiotesList.length>0)
        setSelectedSymbiote(symbiotesList[0])
    } catch (err: any) {
      console.log("error in getting symbiote list", err);
    }
  };

  useEffect(() => {
    getSymbiotesList();
   
  }, []);

  return (
    <div className="flex justify-between gap-3">
      <ConfirmInvest />
      <div className="flex gap-1">
<div className="py-2">
  <h1>⭐Select a Symbiote Token you want to Mint</h1>
</div>      <SymbiotesList/>
      </div>
    </div>
  );
};

export default Invest;
