import { useInvestContext } from "@/components/InvestContext/investContext";
import { withCenterAlignPopup } from "@/hoc/withCenterAlignedPopup";
import { Modal } from "antd";
import React, { useEffect } from "react";

const CoinsListPopup = () => {
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
    setToken,
  } = useInvestContext();

  const coinsList = [
    {
      name: "USDT",
      address: "x03kh280dl17sh1",
      symbol: "USDT",
      balance: 100,
    },
    {
      name: "USDC",
      address: "x03kh280dl17sh1",
      symbol: "USDC",
      balance: 100,
    },
    {
      name: "DAI",
      address: "x03kh280dl17sh1",
      symbol: "DAI",
      balance: 100,
    },
  ];

  useEffect(() => {}, []);

  return (
    <Modal
      open={Boolean(showCoinsList)}
      // onClose={()=>setShowCoinsList(false)}
      onCancel={() => setShowCoinsList(false)}
      footer={false}
    >
      <div className="flex flex-col gap-3 p-4 ">
        {selectedSymbiote && (
          <div>
            <div className="flex flex-col gap-2">
              {coinsList &&
                coinsList.map((item: any) => {
                  return (
                    <button onClick={() => setToken(item)} className=" rounded-lg transition-all box-content border hover:border-violet-500" >
                      <div className="bg-greys-100 p-2 rounded-lg">
                        <h1>{item?.name}</h1>
                        <h1>{item?.address}</h1>
                        <h1>Balance:{item?.balance}</h1>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CoinsListPopup;
