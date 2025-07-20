import { useState } from "react";
import useStore from "../store/store";

function User({ user }) {
    const [form, setForm] = useState({
        id: user.user_id,
        name: user.name,
        email: user.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const API_URL = import.meta.env.VITE_API_URL;
    const { setStatusMessage, deleteUser } = useStore();

    const handleEdit = async (form) => {
        try {
            const response = await fetch(`${API_URL}/user/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            setStatusMessage(data.message);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating user information', 'error');
        }
    }

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm(`Proceed to delete user with the id ${form.id}?`);
            if (!confirmed) return;

            const response = await fetch(`${API_URL}/user/${form.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            const data = await response.json();
            setStatusMessage(data.message);
            deleteUser(form.id);
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deleting user', 'error');
        }
    }

    return (
        <div className="user-card">
            <div className="user-field">
                <label>ID:</label>
                <h2>{form.id}</h2>
            </div>
            <div className="user-field">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="user-field">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div className="user-field">
                <label>Role:</label>
                <p className="capitalize">{user.role}</p>
            </div>
            <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit(form)}>Edit</button>
                { user.role === 'user' && <button className="delete-btn" onClick={() => handleDelete(form.id)}>Delete</button> }
            </div>
        </div>
    );
}

export default User;