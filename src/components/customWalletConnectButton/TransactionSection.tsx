import HyperLinkLogo from '@/assets/header/hyperLink.svg?react'
import { headerWalletAddressShrinker } from '@/utils/walletAddressShrinker'
import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import TooltipCustom from '../tooltip'

const TransactionSection = () => {
    const [state, setState] = useState('Pending')

    const { address } = useAccount()
    const navItems = [
        {
            name: 'Pending',
            id: 1,
        },
        {
            name: 'History',
            id: 2,
        },
    ]

    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const chain = useChainId()
    const url: any = {
        1: 'https://api.etherscan.io/api',
        42161: 'https://api.arbiscan.io/api',
        421614: 'https://api.sepolia.arbiscan.io/api',
    }
    const apiKey: any = {
        1: '',
        42161: 'YQ6H3KW4WRJFTAJRI7J6BJW5XBXY18NNEP',
        421614: 'YQ6H3KW4WRJFTAJRI7J6BJW5XBXY18NNEP',
    }
    console.log('this is url', `${url[chain]}`)
    const [pendingTransactions, setPendingTransactions] = useState<any[]>([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${url[chain]}`, {
                    params: {
                        module: 'account',
                        action: 'txlist',
                        address: address,
                        startblock: 0,
                        endblock: 99999999,
                        sort: 'asc',
                        apikey: apiKey[chain],
                    },
                })

                console.log('this is transaction history', response)

                if (response.data.status === '1') {
                    setTransactions(response.data.result)
                } else {
                    console.error('Error fetching transactions:', response.data.message)
                }
            } catch (error) {
                console.error('Error fetching transactions:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [address, apiKey])

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum)
        const fetchPendingTransactions = async () => {
            // Connect to the Ethereum network via Infura

            // Listen for pending transactions
            provider.on('pending', async txHash => {
                try {
                    // Get the transaction details
                    const tx = await provider.getTransaction(txHash)
                    console.log(tx)
                    // Check if the transaction is to or from the specified address
                    if (tx && (tx.to === address || tx.from === address)) {
                        setPendingTransactions(prevTxs => [...prevTxs, tx])
                    }
                } catch (error) {
                    console.error('Error fetching transaction details:', error)
                }
            })
        }

        fetchPendingTransactions()

        // Cleanup listener on component unmount
        return () => {
            provider.removeAllListeners('pending')
        }
    }, [address])

    return (
        <div>
            <div className=" relative h-[69px] hidden w-full xl:flex justify-between items-center dark:bg-dark-primary dark:border-dark-tertiary">
                <nav className=" h-full hidden lg:flex justify-between w-full items-center mx-auto">
                    <li className="flex gap-[32px] h-full items-center">
                        <ul className="flex text-[16px] gap-[16px] h-full items-center text-neutral-greys-300">
                            {navItems.map((item, index) => {
                                return (
                                    <button
                                        onClick={() => {
                                            setState(item.name)
                                        }}
                                        key={index}
                                        className={`${state === item.name ? 'text-primary ' : 'text-primary-gray'} relative h-full flex items-center`}
                                    >
                                        {item.name}
                                        {state === item.name ? (
                                            <span className="w-full h-[1.2px] bg-primary absolute bottom-0 left-0" />
                                        ) : null}
                                    </button>
                                )
                            })}
                        </ul>
                    </li>

                    <div className="flex gap-2 ">
                        <button className="text-primary text-[12px] xl:text-[14px] px-[20px] xl:px-[24px] min-w-[80px]">
                            view all
                        </button>
                    </div>
                </nav>

                <div></div>
            </div>

            <div className="flex flex-col gap-2 ">
                {state === 'History' &&
                    transactions?.map((item: any) => {
                        return (
                            <div className="py-1 px-2 bg-greys-900 rounded-lg ">
                                <span>{headerWalletAddressShrinker(item?.hash || '', 6, 4)}</span>
                                <TooltipCustom
                                    title={
                                        <p className="text-neutral-greys-950 typo-c1-regular w-  text-center">
                                            Open Contract
                                        </p>
                                    }
                                >
                                    <a
                                        href={`${url[chain]}/${item?.hash}`}
                                        target="_blank"
                                        className="flex gap-1 text-sky-blue-main"
                                    >
                                        <HyperLinkLogo className="h-[20px] w-[20px] " />
                                        View on Etherscan
                                    </a>
                                </TooltipCustom>
                            </div>
                        )
                    })}
                {state === 'Pending' &&
                    pendingTransactions?.map((item: any) => {
                        return (
                            <div className="py-1 px-2 bg-greys-900 rounded-lg ">
                                <span>{headerWalletAddressShrinker(item?.hash || '', 6, 4)}</span>
                                <TooltipCustom
                                    title={
                                        <p className="text-neutral-greys-950 typo-c1-regular w-  text-center">
                                            Open Contract
                                        </p>
                                    }
                                >
                                    <a
                                        href={`${url[chain]}/${item?.hash}`}
                                        target="_blank"
                                        className="flex gap-1 text-sky-blue-main"
                                    >
                                        <HyperLinkLogo className="h-[20px] w-[20px] " />
                                        View on Etherscan
                                    </a>
                                </TooltipCustom>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default TransactionSection
