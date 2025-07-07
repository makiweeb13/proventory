import useStore from "../store/store";
import { useEffect } from "react";
import StatsDisplay from "./StatsDisplay";
import SalesReport from "./SalesReport";
import ProductLeaderboard from "./ProductLeaderboard";

function Dashboard() {

    const { setTitle } = useStore();
    
    useEffect(() => {
        setTitle('Dashboard');
    }, [setTitle]);

    return (
        <>
            <StatsDisplay />
            <div className="side">
                <ProductLeaderboard />
                <div className="grid">
                    <SalesReport period="daily" />
                    <SalesReport period="weekly" />
                    <SalesReport period="monthly" />
                    <SalesReport period="yearly" />
                </div>
            </div>
        </>
    );
}

export default Dashboard;