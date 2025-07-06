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

function SalesReport({ period = "daily" }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/sale?period=${period}`, { credentials: "include" });
      const data = await response.json();
      setChartData({
        labels: data.map(item => {
          if (period === "daily") {
            return item.date;
          }
          if (period === "weekly") {
            return `W${item.week} ${item.year}`;
          }
          if (period === "yearly") {
            return item.year.toString();
          }
          return "";
        }),
        datasets: [
          {
            label: `${period.charAt(0).toUpperCase() + period.slice(1)} Sales Report`,
            data: data.map(item => item.totalSales),
            borderColor: "#61dafb",
            backgroundColor: "rgba(222, 222, 222, 0.2)",
            tension: 0.3,
            fill: true
          }
        ]
      });
    };
    fetchData();
  }, [period]);

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div className="sales-report-chart-container">
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
    </div>
  );
}

export default SalesReport;