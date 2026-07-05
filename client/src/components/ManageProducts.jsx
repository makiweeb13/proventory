import { useState, useEffect } from 'react';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageProducts({ categories }) {
    const { products, statusMessage, statusType, setStatusMessage, setProducts,
            search, setTotalPages, page, order, pageSize, deleteProduct } = useStore();
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: '', stock: 1, buying_price: 0, selling_price: 0, category_id: ''
    });
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

    const startEdit = (product) => {
        setEditingId(product.product_id);
        setForm({
            name: product.name,
            stock: product.stock,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            category_id: product.category_id
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ name: '', stock: 1, buying_price: 0, selling_price: 0, category_id: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${editingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const data = await response.json();
            setStatusMessage(data.message);
            cancelEdit();
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating product', 'error');
        }
    };

    const handleDelete = async (product) => {
        const confirmed = window.confirm(`Proceed to delete product ${product.name}?`);
        if (!confirmed) return;
        try {
            const response = await fetch(`${API_URL}/product/${product.product_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete product');
            const data = await response.json();
            setStatusMessage(data.message);
            deleteProduct(product.product_id);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deleting product', 'error');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="transactions-container">
            <StatusMessage message={statusMessage} type={statusType} />
            <h2>Manage Products</h2>
            <div className="table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Stock</th>
                            <th>Buying Price</th>
                            <th>Selling Price</th>
                            <th>Date Added</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan="7">No products found</td></tr>
                        ) : products.map(product => (
                            <tr key={product.product_id}>
                                {editingId === product.product_id ? (
                                    <>
                                        <td>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="number" name="stock" value={form.stock < 1 ? 1 : form.stock} onChange={handleChange} min={1} />
                                        </td>
                                        <td>
                                            <input type="number" name="buying_price" value={form.buying_price} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="number" name="selling_price" value={form.selling_price} onChange={handleChange} />
                                        </td>
                                        <td>{new Date(product.date_added).toLocaleDateString()}</td>
                                        <td>
                                            <select name="category_id" value={form.category_id} onChange={handleChange}>
                                                <option value="">Select Category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="edit-btn" onClick={handleEdit}>Save</button>
                                                <button className="delete-btn" onClick={cancelEdit}>Cancel</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>&#8369;{Number(product.buying_price).toFixed(2)}</td>
                                        <td>&#8369;{Number(product.selling_price).toFixed(2)}</td>
                                        <td>{new Date(product.date_added).toLocaleDateString()}</td>
                                        <td>{categories.find(c => c.category_id === product.category_id)?.name || 'N/A'}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="edit-btn" onClick={() => startEdit(product)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(product)}>Delete</button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageProducts;
