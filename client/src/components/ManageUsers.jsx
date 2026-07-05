import { useState, useEffect } from 'react';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';
import Pagination from './Pagination';

const STATUS_COLORS = {
    active: '#16a34a',
    inactive: '#6b7280',
    suspended: '#ea580c',
    deleted: '#dc2626'
};

function ManageUsers({ statusFilter }) {
    const { users, statusMessage, statusType, setStatusMessage, setTotalPages,
            setUsers, search, page, order, pageSize, user: currentUser, updateUser } = useStore();
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editStatus, setEditStatus] = useState('active');
    const [editRole, setEditRole] = useState('user');
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/user?search=${search}&page=${page}&order=${order}&pageSize=${pageSize}&showDeleted=${statusFilter === 'deleted' || statusFilter === 'all'}`, { credentials: 'include' });
                const data = await response.json();
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setStatusMessage('Error fetching users', 'error');
                setLoading(false);
            }
        };
        fetchUsers();
    }, [search, setStatusMessage, setUsers, page, order, pageSize, statusFilter, setTotalPages, API_URL]);

    const startEdit = (user) => {
        setEditingId(user.user_id);
        setForm({ name: user.name, email: user.email });
        setEditStatus(user.account_status || 'active');
        setEditRole(user.role || 'user');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ name: '', email: '' });
        setEditStatus('active');
        setEditRole('user');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = async () => {
        const editingUser = users.find(u => u.user_id === editingId);
        try {
            const payload = { ...form };
            if (editingUser && editStatus !== editingUser.account_status) {
                payload.account_status = editStatus;
            }
            if (editingUser && editRole !== editingUser.role) {
                payload.role = editRole;
            }
            const response = await fetch(`${API_URL}/user/${editingId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Failed to update user');
            const data = await response.json();
            setStatusMessage(data.message);
            cancelEdit();
        } catch (error) {
            console.error(error);
            setStatusMessage('Error updating user information', 'error');
        }
    };

    const handleDeactivate = async (user) => {
        const confirmed = window.confirm(`Deactivate user "${user.name}"? They will not be able to log in.`);
        if (!confirmed) return;
        try {
            const response = await fetch(`${API_URL}/user/${user.user_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to deactivate user');
            const data = await response.json();
            setStatusMessage(data.message);
            updateUser({ ...user, account_status: 'deleted' });
        } catch (error) {
            console.error(error);
            setStatusMessage('Error deactivating user', 'error');
        }
    };

    if (loading) return <div>Loading...</div>;

    const filteredUsers = statusFilter === 'all'
        ? users
        : users.filter(u => u.account_status === statusFilter);

    return (
        <div className="transactions-container">
            <StatusMessage message={statusMessage} type={statusType} />
            <h2>Manage Users</h2>
            <div className="table-wrapper">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan="5">No users found</td></tr>
                        ) : filteredUsers.map(user => (
                            <tr key={user.user_id}>
                                {editingId === user.user_id ? (
                                    <>
                                        <td>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="email" name="email" value={form.email} onChange={handleChange} />
                                        </td>
                                        <td>
                                            {currentUser?.role === 'admin' && user.user_id !== currentUser?.id ? (
                                                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="status-select">
                                                    <option value="user">Staff</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            ) : (
                                                <span className="capitalize">{editRole === 'user' ? 'Staff' : editRole}</span>
                                            )}
                                        </td>
                                        <td>
                                            {currentUser?.role === 'admin' ? (
                                                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="status-select">
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                    <option value="suspended">Suspended</option>
                                                    <option value="deleted">Deleted</option>
                                                </select>
                                            ) : (
                                                <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[editStatus] || '#6b7280' }}>
                                                    {editStatus}
                                                </span>
                                            )}
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
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="capitalize">{user.role === 'user' ? 'Staff' : user.role}</td>
                                        <td>
                                            <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[user.account_status] || '#6b7280' }}>
                                                {user.account_status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="edit-btn" onClick={() => startEdit(user)}>Edit</button>
                                                {user.role !== 'admin' && user.account_status !== 'deleted' && (
                                                    <button className="delete-btn" onClick={() => handleDeactivate(user)}>Deactivate</button>
                                                )}
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
}

export default ManageUsers;
