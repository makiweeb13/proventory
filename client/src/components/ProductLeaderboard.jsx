import { useEffect, useState } from "react";

function ProductLeaderboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            const API_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${API_URL}/product/top`, { credentials: "include" });
            const data = await res.json();
            setProducts(data);
        };
        fetchTopProducts();
    }, []);

    return (
        <div className="leaderboard-container">
            <h2>Top Selling Products</h2>
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
        </div>
    );
}

export default ProductLeaderboard;