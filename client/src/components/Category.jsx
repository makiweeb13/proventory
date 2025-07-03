import { useState } from "react";
import useStore from "../store/store";

function Category({ category }) {
    const [form, setForm] = useState({
        id: category.category_id,
        name: category.name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const API_URL = import.meta.env.VITE_API_URL;
    const { setStatusMessage, deleteCategory } = useStore();

    const handleEdit = async () => {
        try {
            const response = await fetch(`${API_URL}/category/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            const data = await response.json();
            setStatusMessage(data.message);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating category', 'error');
        }
    }

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm(`Proceed to delete category ${form.name}?`);
            if (!confirmed) return;

            const response = await fetch(`${API_URL}/category/${form.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            const data = await response.json();
            setStatusMessage(data.message);
            deleteCategory(form.id);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deleting category', 'error');
        }
    }

    return (
        <div className="user-card">
            <div className="user-field">
                <label>ID:</label>
                <h2>{form.id}</h2>
            </div>
            <div className="user-field">
                <label>Category:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit()}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete()}>Delete</button>
            </div>
        </div>
    );
}

export default Category;