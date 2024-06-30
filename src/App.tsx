import { useAccount, useConnect, useDisconnect } from "wagmi";
import RouterConfig from "./router";
import CreateContextProvider, {
  CreateContext,
} from "./components/CreateContext/createContext";
import InvestContextProvider from "./components/InvestContext/investContext";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <CreateContextProvider>
        <InvestContextProvider>
          <RouterConfig />
        </InvestContextProvider>
      </CreateContextProvider>
    </>
  );
}

export default App;
