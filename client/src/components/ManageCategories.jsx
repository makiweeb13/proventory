import { useState, useEffect } from 'react';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageCategories() {
    const { categories, statusMessage, statusType, setStatusMessage, setTotalPages,
            page, order, pageSize, setCategories, search, deleteCategory } = useStore();
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '' });
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/category?search=${search}&page=${page}&pageSize=${pageSize}&order=${order}`, { credentials: 'include' });
                const data = await response.json();
                setCategories(data.categories);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setStatusMessage('Error fetching categories', 'error');
            }
        };
        fetchCategories();
    }, [search, setStatusMessage, setCategories, setTotalPages, page, order, pageSize, API_URL]);

    const startEdit = (category) => {
        setEditingId(category.category_id);
        setForm({ name: category.name });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ name: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`${API_URL}/category/${editingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error('Failed to update category');
            const data = await response.json();
            setStatusMessage(data.message);
            cancelEdit();
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating category', 'error');
        }
    };

    const handleDelete = async (category) => {
        const confirmed = window.confirm(`Proceed to delete category ${category.name}?`);
        if (!confirmed) return;
        try {
            const response = await fetch(`${API_URL}/category/${category.category_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete category');
            const data = await response.json();
            setStatusMessage(data.message);
            deleteCategory(category.category_id);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deleting category', 'error');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="transactions-container">
            <StatusMessage message={statusMessage} type={statusType} />
            <h2>Manage Categories</h2>
            <div className="table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr><td colSpan="2">No categories found</td></tr>
                        ) : categories.map(category => (
                            <tr key={category.category_id}>
                                {editingId === category.category_id ? (
                                    <>
                                        <td>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} />
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
                                        <td>{category.name}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="edit-btn" onClick={() => startEdit(category)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(category)}>Delete</button>
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

export default ManageCategories;
