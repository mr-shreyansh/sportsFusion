import Dot from '@/assets/common/dot.svg?react'
import CrossIcon from '@/assets/popup/cross.svg?react'
import failedIcon from '@/assets/popup/failed.svg'
import greenDot from '@/assets/popup/greenDot.svg'
import incompleteSpinner from '@/assets/popup/incompleteSpinner.svg'
import pendingDot from '@/assets/popup/pendingDot.svg'
import redDot from '@/assets/popup/redDot.svg'
import verifiedIcon from '@/assets/popup/verified.svg'
import { withBottomAlignPopup } from '@/hoc/withBottomAlignedPopup'
import { withCenterAlignPopup } from '@/hoc/withCenterAlignedPopup'
import React, { useEffect, useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { disconnect } from 'wagmi/actions'

let device = {
    isMobile: window.innerWidth < 603,
    isPad: window.innerWidth >= 603 && window.innerWidth <= 1024,
}
function WalletConnectPopup({
    setIsCenterAlignPopupOpen,
}: {
    setIsCenterAlignPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [isConnectedDisplay, setIsConnectedDisplay] = useState<boolean>(false)
    const { connect, connectors, error, isLoading, pendingConnector, reset } = useConnect({
        onSuccess: () => setIsConnectedDisplay(true),
    })

    const { isConnected, connector } = useAccount()

    useEffect(() => {
        if (isConnectedDisplay) {
            setTimeout(() => {
                setIsCenterAlignPopupOpen(false)
            }, 500)
            setTimeout(() => {
                setIsConnectedDisplay(false)
            }, 800)
        }
        if (pendingConnector?.name === 'WalletConnect') {
            setIsCenterAlignPopupOpen(false)
        }
    }, [isConnected, pendingConnector, error, isConnectedDisplay])

    return (
        <div className="py-[28px] rounded-t-[10px] md:rounded-[20px] bg-white dark:bg-dark-primary  shadow1 w-full max-w-[516px]">
            {pendingConnector && !isConnected && !error && isLoading && (
                <div className={``}>
                    <div className="flex justify-end items-center px-[24px] pb-[32px]  min-w-[516px]">
                        <button
                            className="bg-neutral-greys rounded-[64.5px] text-neutral-greys-950 h-[37px] w-[37px] flex items-center justify-center"
                            type="button"
                            onClick={() => setIsCenterAlignPopupOpen(false)}
                        >
                            {' '}
                            <CrossIcon className="h-[20px] w-[20px]" />
                        </button>
                    </div>
                    <div className="flex items-center flex-col ">
                        <img src={incompleteSpinner} alt="" className="h-[121px] w-[121px] animate-spin" />
                        <h4 className="text-neutral-greys-800 typo-h4-bold mt-[33px]">Connecting your Wallet</h4>
                    </div>
                    <div className="rounded-[10px] border-[1px] border-solid border-neutral-greys-200 px-[20px] py-[20px] flex justify-between mx-[24px] mt-[37px]">
                        <div className="flex gap-x-[16px] items-center">
                            <img
                                src={`/assets/wallets/${pendingConnector?.name.replace(/ /g, '').toLowerCase()}.svg`}
                                alt=""
                            />
                            <p className="typo-b1-semiBold text-neutral-greys-950">
                                {pendingConnector?.name || 'Metamask'}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-[16px]">
                            <img src={pendingDot} alt="" className="h-[10px] w-[10px]" />
                            <p className="text-system-warning-500 typo-b1-semiBold">Pending</p>
                        </div>
                    </div>
                </div>
            )}
            {error && !isConnectedDisplay && (
                <div className="">
                    <div className="flex justify-end items-center px-[24px] pb-[32px]  min-w-[516px]">
                        <button
                            className="bg-neutral-greys-200 rounded-[64.5px] text-neutral-greys-950 h-[37px] w-[37px] flex items-center justify-center"
                            type="button"
                            onClick={() => setIsCenterAlignPopupOpen(false)}
                        >
                            {' '}
                            <CrossIcon className="h-[20px] w-[20px]" />
                        </button>
                    </div>
                    <div className="flex items-center flex-col ">
                        <img src={failedIcon} alt="" className="h-[121px] w-[121px] " />
                        <h4 className="text-neutral-greys-800 typo-h4-bold mt-[33px]">Couldn’t connect wallet :(</h4>
                    </div>
                    <div className="rounded-[10px] border-[1px] border-solid border-neutral-greys-200 px-[20px] py-[20px] flex justify-between mx-[24px] mt-[37px]">
                        <div className="flex gap-x-[16px] items-center">
                            <img
                                src={`/assets/wallets/${pendingConnector?.name.replace(/ /g, '').toLowerCase()}.svg`}
                                alt=""
                            />
                            <p className="typo-b1-semiBold text-neutral-greys-950">
                                {pendingConnector?.name || 'Metamask'}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-[16px]">
                            <img src={redDot} alt="" className="h-[10px] w-[10px]" />
                            <p className="text-system-error-500 typo-b1-semiBold">Failed</p>
                        </div>
                    </div>
                    <div className="w-full px-[20px] mt-[32px]">
                        <button
                            className="rounded-[10px] bg-primary-main-500 text-center w-full px-[20px] py-[12px]   text-neutral-greys-100 typo-b2-semiBold"
                            onClick={() => {
                                reset()
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
            {isConnectedDisplay && (
                <div className=" min-w-[516px]">
                    <div className="flex justify-end items-center px-[24px] pb-[32px] ">
                        <button
                            className="bg-neutral-greys-200 rounded-[64.5px] text-neutral-greys-950 h-[37px] w-[37px] flex items-center justify-center"
                            type="button"
                            onClick={() => setIsCenterAlignPopupOpen(false)}
                        >
                            {' '}
                            <CrossIcon className="h-[20px] w-[20px]" />
                        </button>
                    </div>
                    <div className="flex items-center flex-col ">
                        <img src={verifiedIcon} alt="" className="h-[121px] w-[121px] " />
                        <h4 className="text-neutral-greys-800 typo-h4-bold mt-[33px]">Wallet Connected Successfully</h4>
                    </div>
                    <div className="rounded-[10px] border-[1px] border-solid border-neutral-greys-200 px-[20px] py-[20px] flex justify-between mx-[24px] mt-[37px]">
                        <div className="flex gap-x-[16px] items-center">
                            <img
                                src={`/assets/wallets/${pendingConnector?.name.replace(/ /g, '').toLowerCase()}.svg`}
                                alt=""
                            />
                            <p className="typo-b1-semiBold text-neutral-greys-950">
                                {pendingConnector?.name || 'Metamask'}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-[16px]">
                            <img src={greenDot} alt="" className="h-[10px] w-[10px]" />
                            <p className="text-system-success-500 typo-b1-semiBold">Connected</p>
                        </div>
                    </div>
                </div>
            )}

            {(!pendingConnector || !isLoading) && !isConnectedDisplay && !error && (
                <div>
                    <div className="flex justify-between flex-col items-end px-[24px] min-w-[516px]">
                        <button
                            className=" h-[20px] w-[20
                                px] flex justify-center"
                            type="button"
                            onClick={() => setIsCenterAlignPopupOpen(false)}
                        >
                            {' '}
                            <CrossIcon className="h-[20px] w-[20px] dark:text-white" />
                        </button>
                        <h4 className="font-semibold text-[18px] sm:text-[28px] md:text-[38px] dark:text-dark-text font-sans w-full text-start pl-[16px]">
                            Connect your Wallet
                        </h4>
                    </div>
                    <div className="mx-[24px] my-[20px] pl-[16px] pr-[16px] md:pr-[32px] py-[10px] font-sans">
                        <p className="text-neutral-greys-500">
                            By connecting my wallet I agree to the {''}
                            <span className="text-primary typo-b3-line mx-1"> Terms of Use </span> and{' '}
                            <span className="text-primary typo-b3-line mx-1"> Privacy Policy</span>{' '}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-y-[16px] px-[24px]">
                        {connectors?.map(connectorItem => (
                            <button
                                key={connectorItem.id}
                                type="button"
                                className={`w-full px-[18px] py-[14px] md:px-[24px] md:py-[20px]  flex items-center justify-between font-sans text-text-gray1 dark:text-dark-text rounded-[10px] bg-white dark:bg-dark-primary border border-greys-100 dark:border-greys-900 hover:shadow-lg dark:shadow-greys-900 transition-all  `}
                                onClick={() => {
                                    if (connector?.id === connectorItem.id) {
                                        disconnect()
                                    } else {
                                        connect({ connector: connectorItem })
                                    }
                                }}
                            >
                                {' '}
                                <p className="flex items-center gap-2 md:gap-x-[16px]">
                                    <img
                                        src={`/assets/wallets/${connectorItem?.name
                                            .replace(/ /g, '')
                                            .toLowerCase()}.svg`}
                                        alt=""
                                        className=" h-[24px] w-[24px] md:h-[32px] md:w-[32px] "
                                    />
                                    <span> {connectorItem?.name}</span>
                                </p>
                                {connector === connectorItem && (
                                    <button
                                        onClick={() => disconnect()}
                                        className="flex text-error-color2 text-[12px] md:text-[14px] gap-1 items-center"
                                    >
                                        <Dot /> Disconnect
                                    </button>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between px-[24px] mt-[32px]">
                        <p className=" text-neutral-greys-500 font-sans ">New to Web3 wallets?</p>
                        <a
                            href="https://ethereum.org/en/wallets/"
                            className="text-sky-blue-main underline"
                            target="_blank"
                        >
                            Learn more
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default device.isMobile ? withBottomAlignPopup(WalletConnectPopup) : withCenterAlignPopup(WalletConnectPopup)
// export default withCenterAlignPopup(WalletConnectPopup)
