import { useState, useEffect } from 'react';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function AddSales() {
    const { products, statusMessage, statusType, setStatusMessage, setProducts,
            search, setTotalPages, page, order, pageSize, user, updateProduct } = useStore();
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/product?search=${search}&order=${order}&page=${page}&pageSize=${pageSize}`, { credentials: 'include' });
                const data = await response.json();
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setStatusMessage('Error fetching products', 'error');
            }
        };
        fetchProducts();
    }, [search, setStatusMessage, setProducts, setTotalPages, page, order, pageSize, API_URL]);

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({ ...prev, [productId]: parseInt(value) || 1 }));
    };

    const handleAdd = async (product) => {
        const quantity = quantities[product.product_id] || 1;
        try {
            const response = await fetch(`${API_URL}/sale`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: product.product_id,
                    user_id: user.id,
                    quantity,
                    selling_price: product.selling_price
                }),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to add sale');
            const data = await response.json();
            setStatusMessage(data.message);
            updateProduct(data.product);
            setQuantities(prev => ({ ...prev, [product.product_id]: 1 }));
        } catch (error) {
            setStatusMessage(`Error adding sale: ${error.message}`, 'error');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="transactions-container">
            <StatusMessage message={statusMessage} type={statusType} />
            <h2>Add Sales</h2>
            <div className="table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Stock</th>
                            <th>Quantity</th>
                            <th>Selling Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan="5">No products found</td></tr>
                        ) : products.map(product => (
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={quantities[product.product_id] || 1}
                                        onChange={(e) => handleQuantityChange(product.product_id, e.target.value)}
                                        min={1}
                                    />
                                </td>
                                <td>&#8369;{Number(product.selling_price).toFixed(2)}</td>
                                <td>
                                    <button className="add-btn" onClick={() => handleAdd(product)}>Add</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddSales;
