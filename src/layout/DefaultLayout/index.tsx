import { FunctionComponent } from "react";
import Header from "./header";

interface DefaultLayoutProps {
    MainContentComponent: FunctionComponent 
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({MainContentComponent}) => {
    return (
        <div>
            <Header/>
            <MainContentComponent/>
        </div>
    )
}

export default DefaultLayout