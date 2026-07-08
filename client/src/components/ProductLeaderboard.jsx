import API_URL from "../util/api";
import { useEffect, useState } from "react";

function ProductLeaderboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            const res = await fetch(`${API_URL}/product/top`, { credentials: "include" });
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        };
        fetchTopProducts();
    }, []);

    if (loading) {
        return (
            <div className="leaderboard-container">
                <h2>Top Selling Products</h2>
                <div className="dashboard-loading">Loading top products...</div>
            </div>
        );
    }

    return (
        <div className="leaderboard-container">
            <h2>Top Selling Products</h2>
            {products.length === 0 ? (
                <div className="dashboard-loading">No sales data yet</div>
            ) : (
                <ol className="leaderboard-list">
                    {products.map((product, idx) => (
                        <li key={product.product_id} className="leaderboard-item">
                            <span className="rank">{idx + 1}</span>
                            <span className="product-name">{product.name}</span>
                            <span className="product-sales">{product.totalSold} sold</span>
                            <span className="product-stock">{product.stock} in stock</span>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default ProductLeaderboard;