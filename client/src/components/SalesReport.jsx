import API_URL from "../util/api";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function SalesReport() {
  const [period, setPeriod] = useState("daily");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/sale?period=${period}`, { credentials: "include" });
      const data = await response.json();
      setChartData({
        labels: data.map(item => {
          if (period === "daily") return item.date;
          if (period === "weekly") return `W${item.week} ${item.year}`;
          if (period === "monthly") return `${item.year}-${String(item.month).padStart(2, '0')}`;
          if (period === "yearly") return item.year.toString();
          return "";
        }),
        datasets: [
          {
            label: `${period.charAt(0).toUpperCase() + period.slice(1)} Sales`,
            data: data.map(item => item.totalSales),
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            tension: 0.3,
            fill: true
          }
        ]
      });
      setLoading(false);
    };
    fetchData();
  }, [period]);

  if (loading) return <div className="dashboard-loading">Loading chart...</div>;

  return (
    <div className="sales-report-chart-container">
      <div className="chart-header">
        <h3>Sales Report</h3>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="chart-wrapper">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true } } }} />
      </div>
    </div>
  );
}

export default SalesReport;
