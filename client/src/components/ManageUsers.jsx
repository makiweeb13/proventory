import { useState, useEffect } from 'react';
import API_URL from '../util/api';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';
import Pagination from './Pagination';
import UserRow from './UserRow';

function ManageUsers({ statusFilter }) {
    const { users, statusMessage, statusType, setStatusMessage, setTotalPages,
            setUsers, search, page, order, pageSize, user: currentUser, updateUser } = useStore();
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '', email: '' });
    const [editStatus, setEditStatus] = useState('active');
    const [editRole, setEditRole] = useState('user');

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
                            <UserRow
                                key={user.user_id}
                                user={user}
                                isEditing={editingId === user.user_id}
                                form={form}
                                editStatus={editStatus}
                                editRole={editRole}
                                currentUser={currentUser}
                                handleChange={handleChange}
                                startEdit={startEdit}
                                cancelEdit={cancelEdit}
                                handleEdit={handleEdit}
                                handleDeactivate={handleDeactivate}
                                setEditRole={setEditRole}
                                setEditStatus={setEditStatus}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination />
        </div>
    );
}

export default ManageUsers;
