import useStore from "../store/store";
import { useEffect } from "react";
import StatsDisplay from "./StatsDisplay";
import SalesReport from "./SalesReport";

function Dashboard() {

    const { setTitle } = useStore();
    
    useEffect(() => {
        setTitle('Dashboard');
    }, [setTitle]);

    return (
        <>
            <StatsDisplay />
            <SalesReport period="daily" />
            <SalesReport period="weekly" />
            <SalesReport period="yearly" />
        </>
    );
}

export default Dashboard;