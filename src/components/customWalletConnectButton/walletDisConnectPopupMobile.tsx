import CopyLogo from '@/assets/header/copy.svg'
import DownArrow from '@/assets/header/downArrow.svg'
import HyperLinkLogo from '@/assets/header/hyperLink.svg'
import PowerLogo from '@/assets/header/power.svg'
import blueDot from '@/assets/popup/blueDot.svg'
import CrossIcon from '@/assets/popup/cross.svg'
import { withCenterAlignPopup } from '@/hoc/withCenterAlignedPopup'
import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'

function WalletDisConnectPopupMobile({
    setIsCenterAlignPopupOpen,
    setIsDisConnectBoxOpened,
    setIsWalletConnectPopUpOpened,
}: {
    setIsCenterAlignPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsDisConnectBoxOpened: (value: React.SetStateAction<boolean>) => void
    setIsWalletConnectPopUpOpened: (value: React.SetStateAction<boolean>) => void
}) {
    const { connector, address } = useAccount()
    const { disconnect } = useDisconnect()
    return (
        <div className="rounded-t-[10px]  bg-neutral-greys-100 px-[20px] py-[20px] min-w-[100vw] ">
            <div className="flex justify-between items-center">
                <p className="typo-b1-semiBold text-neutral-greys-800">Account</p>
                <button
                    className="bg-neutral-greys-200 rounded-[64.5px] text-neutral-greys-950 h-[37px] w-[37px] flex items-center justify-center"
                    type="button"
                    onClick={() => setIsCenterAlignPopupOpen(false)}
                >
                    {' '}
                    <img src={CrossIcon} className="h-[20px] w-[20px]" />
                </button>
            </div>
            <div className="rounded-[10px] border-[1px] border-solid border-neutral-greys-300 bg-neutral-greys-100 shadow-1 mt-[24px] px-[16px] py-[16px]">
                <div className="flex items-center justify-between  border-b-[1px] border-solid border-neutral-greys-200  pb-[16px]">
                    <div className="flex items-center  gap-x-[10px] ">
                        <div className="h-[40px] w-[40px] bg-neutral-greys-300 rounded-[50%]" />
                        <div>
                            <p className="typo-b1-regular text-neutral-greys-800">
                                {(address)}
                            </p>
                            <p className="typo-b3-regular text-neutral-greys-500">{connector?.name}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="pointer-events-none opacity-[0.5] rounded-[10px] border-[1px] border-solid border-neutral-greys-300 bg-neutral-greys-200 py-[6px] px-[16px] flex items-center gap-x-[8px] text-neutral-greys-950  typo-b2-semiBold"
                    >
                        <img src={blueDot} alt="" className="h-[8px] w-[8px]" />
                        <span className="text-neutral-greys-950"> Arbitrum</span>

                        <img src={DownArrow} className="h-[24px] w-[24px] text-neutral-greys-950" />
                    </button>
                </div>
                <div className="pt-[16px] px-[16px]">
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-x-[4px] text-neutral-greys-500 typo-b3-regular">
                            <img src={CopyLogo} className="h-[18px] w-[18px] text-neutral-greys-500" />
                            <span>Copy address</span>
                        </p>
                        <a
                            href={`https://arbiscan.io/address/${address}`}
                            target="_blank"
                            className="flex items-center gap-x-[4px] text-neutral-greys-500 typo-b3-regular"
                        >
                            <img src={HyperLinkLogo} className="h-[18px] w-[18px] text-neutral-greys-500" />
                            <span>View on Etherscan</span>
                        </a>
                    </div>

                    <button
                        type="button"
                        className="px-[20px] py-[12px] rounded-[10px] typo-b3-semiBold text-neutral-greys-100  flex items-center gap-x-[8px] bg-primary-main-500 hover:bg-primary-main-400 w-full justify-center mt-[24px] mb-[16px]"
                        onClick={() => {
                            disconnect()
                            setIsDisConnectBoxOpened(false)
                            setIsCenterAlignPopupOpen(false)
                        }}
                    >
                        {' '}
                        <img src={PowerLogo} className="h-[18px] w-[18px] text-neutral-greys-100" />
                        <span>Disconnect</span>{' '}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withCenterAlignPopup(WalletDisConnectPopupMobile)
