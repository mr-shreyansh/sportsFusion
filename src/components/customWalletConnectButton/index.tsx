import DashboardDownArrow from "@/assets/dashboard/dashboardDownArrow.svg";
import CopyLogo from "@/assets/header/copy.svg";
import HyperLinkLogo from "@/assets/header/hyperLink.svg";
import PowerLogo from "@/assets/header/power.svg";
import { useEffect, useRef, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";

import Dot from "@/assets/common/dot.svg";
import GreenDot from "@/assets/popup/greenDot.svg";
import Tick from "@/assets/common/tick.svg";
import arbiturmLogo from "@/assets/header/arbitrumLogo.svg";
import ethLogo from "@/assets/header/ethLogo.svg";
import TransactionSection from "./TransactionSection";
import WalletConnectPopup from "./walletConnectPopup";

function CustomWalletConnectButton({ className }: { className?: string }) {
  let device = {
    isMobile: window.innerWidth < 603,
    isPad: window.innerWidth >= 603 && window.innerWidth <= 1024,
  };

  const walletConnectButtonRef = useRef<HTMLDivElement>(null);
  const [isDisConnectBoxOpened, setIsDisConnectBoxOpened] =
    useState<boolean>(false);
  const [isNetworkBoxOpened, setIsNetworkBoxOpened] = useState(false);
  const [isWalletConnectPopUpOpened, setIsWalletConnectPopUpOpened] =
    useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const { disconnect } = useDisconnect();
  // const network = useNetwork()
  // const { switchNetwork } = useSwitchNetwork()
  const handleBlur = (event: { target: any }) => {
    if (
      walletConnectButtonRef.current &&
      !walletConnectButtonRef.current.contains(event.target)
    ) {
      setIsDisConnectBoxOpened(false);
      setIsNetworkBoxOpened(false);
    }
  };

  const chainId = useChainId();

  const networks = [
    { name: "Mainnet", icon: ethLogo, chainId: 1 },
    { name: "Sepolia", icon: arbiturmLogo, chainId: 421614 },
    { name: "Arbitrum", icon: arbiturmLogo, chainId: 42161 },
  ];

  // const NetworkSwitch = async (chainId: any) => {
  //     try {
  //         switchNetwork?.(Number(chainId))
  //     } catch (err: any) {
  //         console.log('error in switching network', err)
  //     }
  // }

  const isMobile = window.innerWidth <= 768;
  const { isConnected, address, connector, chain } = useAccount();
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false);

  const handleCopy = () => {
    console.log("copy");
    setIsAddressCopied(true);
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener("click", handleBlur);
    return () => {
      window.removeEventListener("click", handleBlur);
    };
  }, []);

  return (
    <div className={`${className} relative`} ref={walletConnectButtonRef}>
      <div className="flex itmes-center ">
        {isConnected ? (
          <div className="grid grid-cols-2 gap-0 rounded-full bg-purple-500 dark:bg-dark-primary border border-violet-700 dark:border-primary-black">
            <button
              onClick={() => {
                setIsNetworkBoxOpened(!isNetworkBoxOpened),
                  setIsDisConnectBoxOpened(false);
              }}
              className="flex px-1 items-center dark:bg-dark-secondary rounded-l-full"
            >
              {/* <img src={Dot} className="text-primary" /> */}
              <span className=" h-[36px] overflow-hidden whitespace-nowrap flex items-center px-1 text-black">
                {chain?.name}
              </span>
            </button>
            <button
              onClick={() => {
                setIsDisConnectBoxOpened((prevState) => !prevState),
                  setIsNetworkBoxOpened(false);
              }}
              type="button"
              className="py-[8.5px] gap-2 text-black px-1 rounded-r-full bg-greys-100  dark:bg-dark-primary flex items-center justify-between  cursor-pointer "
            >
              <img src={GreenDot} alt="" className="h-[12px] w-[12px]" />{" "}
              <span className="">
                {" "}
                {address?.slice(0, 3) + "..." + address?.slice(-3)}
              </span>{" "}
              <img
                src={DashboardDownArrow}
                className="h-[24px] w-[24px] hidden lg:block"
              />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="rounded-[90px] bg-primary h-[40px] px-[24px] text-white cursor-pointer hover:bg-primary-hover"
            onClick={() => setIsWalletConnectPopUpOpened(true)}
          >
            {device.isPad || device.isMobile ? "Connect" : "Connect Wallet"}
          </button>
        )}
      </div>
      {isDisConnectBoxOpened && !isMobile && (
        <div>
          <div className="absolute hidden  md:block bg-white dark:bg-dark-primary -left-[40px] xl:-left-[50px] top-[55px]  rounded-[10px] border dark:border-greys-900 shadow1 px-[16px] py-[16px] lg:min-w-[420px] z-[5]">
            <div className="flex items-center justify-between">
              <p className="text-text-gray1 dark:text-dark-text">
                Your account
              </p>
              <button
                type="button"
                className=" rounded-full flex gap-1 items-center border py-1 px-2 border-sky-blue-main text-sky-blue-main hover:text-white hover:border-white hover:bg-sky-blue-main "
                onClick={() => {
                  disconnect();
                  setIsDisConnectBoxOpened(false);
                }}
              >
                {" "}
                <img src={PowerLogo} className="h-[18px] w-[18px] " />
                <span className="font-sans font-normal  ">Disconnect</span>{" "}
              </button>
            </div>
            <div className="px-[12px] py-[12px] flex justify-between items-center rounded-[10px] mt-[16px] bg-greys-100 dark:bg-dark-secondary w-full">
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-1 items-center text-greys-500 ">
                    <div className="h-[40px] w-[40px] bg-neutral-800 rounded-[50%]" />
                    {/* <img src={avatarUrl} className="h-[40px] w-[40px]" /> */}
                    {/* <span>{headerWalletAddressShrinker(address || '', 6, 4)}</span> */}
                  </div>
                  <button
                    className="px-[20px] py-2 text-text-gray1 dark:text-dark-text border dark:border-dark-tertiary rounded-full"
                    type="button"
                    onClick={() => {
                      setIsDisConnectBoxOpened(false);
                      setIsWalletConnectPopUpOpened(true);
                    }}
                  >
                    Change
                  </button>
                </div>
                <div className="flex justify-start px-2 gap-3 w-full">
                  {/* <TooltipCustom
                                            title={
                                                <p className="text-neutral-greys-950  text-center">
                                                    {isAddressCopied ? 'Copied' : 'Copy'}
                                                </p>
                                            }
                                            position="left"
                                        >
                                            <button className="flex gap-1 text-sky-blue-main" type="button">
                                                <CopyLogo className="h-[20px] w-[20px]" /> Copy address
                                            </button>
                                        </TooltipCustom>
                                        
                                       */}
                </div>
              </div>
            </div>

            {/* <div>Transactions</div> */}

            {/* <TransactionSection /> */}
          </div>
        </div>
      )}
      {/* 
            {isNetworkBoxOpened && !isMobile && (
                <div>
                    <div className="absolute hidden  md:flex bg-white dark:bg-dark-primary -left-[80px] xl:-left-[220px] top-[55px]  rounded-[10px] border dark:border-dark-secondary shadow1 px-[16px] py-[16px] lg:min-w-[420px] z-[5] flex-col gap-2 ">
                        {networks.map(item => {
                            return (
                                <button
                                    onClick={() => {
                                        // NetworkSwitch(item.chainId)
                                    }}
                                    className="flex justify-between items-center w-full hover:bg-greys-100 p-2 rounded-lg  "
                                >
                                    <div className="flex gap-1 items-center text-greys-500 ">
                                        <img src={item?.icon} />
                                        <span>{item.name}</span>
                                    </div>
                                    {chainId === item.chainId && (
                                        <Tick className="text-white rounded-full bg-primary text-[20px] p-1 w-[20] h-[20]" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )} */}
      <WalletConnectPopup
        isCenterAlignPopupOpen={isWalletConnectPopUpOpened}
        setIsCenterAlignPopupOpen={setIsWalletConnectPopUpOpened}
        isCloseButtonDisplay={false}
        isFullWidth
      />
      {/* <WalletDisConnectPopupMobile
                isCenterAlignPopupOpen={isDisConnectBoxOpened && isMobile}
                setIsCenterAlignPopupOpen={setIsDisConnectBoxOpened}
                setIsDisConnectBoxOpened={setIsDisConnectBoxOpened}
                setIsWalletConnectPopUpOpened={setIsWalletConnectPopUpOpened}
            /> */}
    </div>
  );
}

export default CustomWalletConnectButton;
