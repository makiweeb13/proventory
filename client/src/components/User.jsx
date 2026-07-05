import { useState } from "react";
import useStore from "../store/store";

const STATUS_COLORS = {
    active: '#16a34a',
    inactive: '#6b7280',
    suspended: '#ea580c',
    deleted: '#dc2626'
};

function User({ user }) {
    const { setStatusMessage, user: currentUser } = useStore();
    const [form, setForm] = useState({
        id: user.user_id,
        name: user.name,
        email: user.email
    });
    const [status, setStatus] = useState(user.account_status || 'active');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const API_URL = import.meta.env.VITE_API_URL;

    const handleEdit = async (form) => {
        try {
            const payload = { ...form };
            if (status !== user.account_status) {
                payload.account_status = status;
            }
            const response = await fetch(`${API_URL}/user/${form.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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

    const handleDeactivate = async () => {
        const confirmed = window.confirm(`Deactivate user "${user.name}"? They will not be able to log in.`);
        if (!confirmed) return;

        try {
            const response = await fetch(`${API_URL}/user/${form.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to deactivate user');
            }

            const data = await response.json();
            setStatusMessage(data.message);
            setStatus('deleted');
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deactivating user', 'error');
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
                <p className="capitalize">{user.role === 'user' ? 'Staff' : user.role}</p>
            </div>
            <div className="user-field">
                <label>Status:</label>
                <span
                    className="status-badge"
                    style={{ backgroundColor: STATUS_COLORS[status] || '#6b7280' }}
                >
                    {status}
                </span>
            </div>
            {currentUser?.role === 'admin' && (
                <div className="user-field">
                    <label>Change Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="status-select"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>
            )}
            <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit(form)}>Save</button>
                {user.role !== 'admin' && status !== 'deleted' && (
                    <button className="delete-btn" onClick={handleDeactivate}>Deactivate</button>
                )}
            </div>
        </div>
    );
}

export default User;
