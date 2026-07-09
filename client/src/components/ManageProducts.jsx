import { useState, useEffect } from 'react';
import API_URL from '../util/api';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';
import Pagination from './Pagination';
import ProductRow from './ProductRow';
import AddStockModal from './AddStockModal';

function ManageProducts({ categories }) {
    const { products, statusMessage, statusType, setStatusMessage, setProducts,
            search, setTotalPages, page, order, pageSize, user: currentUser, deleteProduct } = useStore();
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [stockProduct, setStockProduct] = useState(null);
    const [form, setForm] = useState({
        name: '', stock: 1, buying_price: 0, selling_price: 0, category_id: ''
    });
    const isAdmin = currentUser?.role === 'admin';

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

    const colSpan = isAdmin ? 6 : 5;

    return (
        <div className="transactions-container">
            {stockProduct && (
                <AddStockModal product={stockProduct} onClose={() => setStockProduct(null)} />
            )}
            <StatusMessage message={statusMessage} type={statusType} />
            <h2>Manage Products</h2>
            <div className="table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Stock</th>
                            {isAdmin && <th>Buying Price</th>}
                            <th>Selling Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr><td colSpan={colSpan}>No products found</td></tr>
                        ) : products.map(product => (
                            <ProductRow
                                key={product.product_id}
                                product={product}
                                isEditing={editingId === product.product_id}
                                form={form}
                                categories={categories}
                                isAdmin={isAdmin}
                                handleChange={handleChange}
                                startEdit={startEdit}
                                cancelEdit={cancelEdit}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                onAddStock={setStockProduct}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
}

export default ManageProducts;
