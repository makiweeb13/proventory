import { useState } from "react";

function User({ user }) {
    const [form, setForm] = useState({
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

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
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="user-actions">
                <button className="edit-btn" >Edit</button>
                <button className="delete-btn" >Delete</button>
            </div>
        </div>
    );
}

export default User;