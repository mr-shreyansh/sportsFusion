import CustomWalletConnectButton from "@/components/customWalletConnectButton";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center gap-[50vw] justify-end p-2 border-b-violet-400 me-[200px]">
        <div className="text-violet-500 font-mono font-bold text-[32px]">SPORTS✖️FUSION</div>
      <CustomWalletConnectButton />
    </div>
  );
};

export default Header;
