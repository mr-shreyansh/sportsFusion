import { createContext, useContext, useState } from 'react'
import { showCallsStatus } from 'viem/experimental';

const defaultValue = {
  symbiotesList:[],
  setSymbiotesList:(a:any)=> {},
  selectedSymbiote:'',
  setSelectedSymbiote:(a:any)=>{},
  tokenDeposite:'',
  setTokenDeposite:(a:any) => {},
  tokenAmount:'',
  setTokenAmount:(a:any)=>{},
  awardType:'',
  setAwardType:(a:any)=>{},
  showCoinsList:false,
  setShowCoinsList:(a:any)=>{},
  token:null,
  setToken:(a:any)=>{},

}

export const InvestContext = createContext(defaultValue)

export default function InvestContextProvider({ children }: any) {

const [symbiotesList, setSymbiotesList] = useState<any[any]>();
const [selectedSymbiote, setSelectedSymbiote ] = useState<any>();
const [tokenDeposite, setTokenDeposite] = useState<any>('USDT');
const [tokenAmount, setTokenAmount] = useState<any>();
const [awardType, setAwardType] = useState<any>();
const [showCoinsList, setShowCoinsList] = useState<boolean>(false);
const [token,setToken] = useState<any>();

    return (
        <InvestContext.Provider
            value={{
                symbiotesList,
                setSymbiotesList,
                selectedSymbiote,
                setSelectedSymbiote,
                tokenDeposite,
                setTokenDeposite,
                tokenAmount,
                setTokenAmount,
                awardType,
                setAwardType,
                showCoinsList,
                setShowCoinsList,
                token,
                setToken

            }}
        >
            {children}
        </InvestContext.Provider>
    )
}





export function useInvestContext() {
    const context = useContext(InvestContext)

    if (!context) {
        throw new Error('useInvestContext must be within InvestContextProvider')
    }
    return context
}


