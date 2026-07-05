import { useState, useEffect } from "react";
import Stat from "./Stat";

function StatsDisplay() {

    const [stats, setStats] = useState([]);

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
            }
        };

        fetchStats();
    }, []);

    const DASHBOARD_LABELS = [
        'Total Products', 'Total Stock', 'Total Sales',
        'Low Stock Items', 'Total Inventory Value'
    ];

    if (stats.length === 0) {
        return <h1>Loading statistics...</h1>;
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