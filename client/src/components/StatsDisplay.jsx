import { useState, useEffect } from "react";
import Stat from "./Stat";

function StatsDisplay() {

    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/stat`, {
                    credentials: 'include',
                });
                const fetchedStats = await response.json();
                setStats(fetchedStats.statistics);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const DASHBOARD_LABELS = [
        'Total Products', 'Total Stock', 'Total Sales',
        'Low Stock Items', 'Total Inventory Value'
    ];

    if (loading) {
        return <div className="dashboard-loading">Loading statistics...</div>;
    }

    if (stats.length === 0) {
        return <div className="dashboard-loading">No statistics available</div>;
    }

    return (
        <div className="stats-display">
            {stats
                .filter(stat => DASHBOARD_LABELS.includes(stat.label))
                .map((stat, index) => (
                    <Stat key={index} value={stat.value} label={stat.label} />
                ))
            }
        </div>
    );
}

export default StatsDisplay;