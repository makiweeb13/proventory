import "../print.css";
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
            <div className="report-header">
                <h1>PROVENTORY</h1>
                <h2>Inventory Summary Report</h2>
                <p className="report-date">Generated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                })}</p>
                <hr />
            </div>
            <StatsDisplay />
            <div className="side">
                <ProductLeaderboard />
                <div className="dashboard-chart">
                    <SalesReport />
                </div>
            </div>
            <div className="report-footer">
                Proventory &mdash; Confidential
            </div>
        </>
    );
}

export default Dashboard;
