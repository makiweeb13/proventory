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
            <div className="dashboard-header">
                <button className="print-btn" onClick={() => window.print()}>
                    &#128424; Print Report
                </button>
            </div>
            <StatsDisplay />
            <div className="side">
                <ProductLeaderboard />
                <div className="dashboard-chart">
                    <SalesReport />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
