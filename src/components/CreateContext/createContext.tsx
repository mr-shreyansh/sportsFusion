import { createContext, useContext, useState } from 'react'

const defaultValue = {
  symboiteName:'',
  symboiteSymbol:'',
  usdtValue:0,
  tokenValue:0,
  tokenName:'',
  tokenAddress:'',
  tokenSymbol:'',
  setSymboiteName: (a:any) => {},
  setSymboiteSymbol: (a:any)=>{},
  setUsdtValue:(a:any)=>{},
  setTokenValue:(a:any)=>{},
  setTokenName: (a:any) => {},
  setTokenAddress: (a:any) => {},
  setTokenSymbol: (a:any) => {},

}

export const CreateContext = createContext(defaultValue)

export default function CreateContextProvider({ children }: any) {

   
const [symboiteName, setSymboiteName] = useState<any>('');
const [symboiteSymbol, setSymboiteSymbol] = useState<any>('');
const [usdtValue, setUsdtValue] = useState<any>(0);
const [tokenValue, setTokenValue] = useState<any>(0);
const [tokenName, setTokenName] = useState<any>('');
const [tokenAddress, setTokenAddress] = useState<any>('');
const [tokenSymbol, setTokenSymbol] = useState<any>('');

    return (
        <CreateContext.Provider
            value={{
                symboiteName,
                setSymboiteName,
                symboiteSymbol,
                setSymboiteSymbol,
                usdtValue,
                setUsdtValue,
                tokenValue,
                setTokenValue,
                tokenName,
                setTokenName,
                tokenAddress,
                setTokenAddress,
                tokenSymbol,
                setTokenSymbol
            }}
        >
            {children}
        </CreateContext.Provider>
    )
}

export function useCreateContext() {
    const context = useContext(CreateContext)

    if (!context) {
        throw new Error('useCreateContext must be within CreateContextProvider')
    }
    return context
}
