import { useState } from "react";
import useStore from "../store/store";

function Product({ product }) {
    const [form, setForm] = useState({
        id: product.product_id,
        name: product.name,
        stock: product.stock,
        buying_price: product.buying_price,
        selling_price: product.selling_price,
        date_added: product.date_added,
        category_id: product.category_id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const API_URL = import.meta.env.VITE_API_URL;
    const { setStatusMessage, deleteProduct, categories } = useStore();

    const handleEdit = async () => {
        
        try {
            const response = await fetch(`${API_URL}/product/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to update product')
            }

            const data = await response.json();
            setStatusMessage(data.message);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating product', 'error');
        }
    }

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm(`Proceed to delete product ${form.name}?`);
            if (!confirmed) return;

            const response = await fetch(`${API_URL}/product/${form.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            const data = await response.json();
            setStatusMessage(data.message);
            deleteProduct(form.id);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deleting product', 'error');
        }
    }

    return (
        <div className="user-card">
            <div className="user-field">
                <label>Product:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="user-field">
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    value={form.stock < 1 ? 1 : form.stock}
                    onChange={handleChange}
                    min={1}
                />
            </div>
            {/* <div className="user-field">
                <label>Buying Price (<span>&#8369;</span>):</label>
                <input
                    type="number"
                    name="buying_price"
                    value={form.buying_price}
                    onChange={handleChange}
                />
            </div> */}
            <div className="user-field">
                <label>Selling Price (<span>&#8369;</span>):</label>
                <input
                    type="number"
                    name="selling_price"
                    value={form.selling_price}
                    onChange={handleChange}
                />
            </div>
            <div className="user-field">
                <label>Date Added:</label>
                <p>{new Date(form.date_added).toLocaleDateString()}</p>
            </div>
            <div className="user-field">
                <label>Category:</label>
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {
                        categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit()}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    );
}

export default Product;