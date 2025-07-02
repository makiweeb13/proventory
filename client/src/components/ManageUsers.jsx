import { useState, useEffect } from 'react';
import User from './User';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageUsers() {
    const { users, statusMessage, statusType, setStatusMessage, setUsers, search } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/user?search=${search}`, { credentials: 'include' });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setStatusMessage('Error fetching users', 'error');
            }
        };
        fetchUsers();
        setLoading(false);
    }, [search, setStatusMessage, setUsers]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (users.length === 0) {
        return <div>No users found.</div>;
    } 
    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <StatusMessage message={statusMessage} type={statusType} />
            <div className="manage-users-list">
                {users.map(user => (
                    <User user={user} key={user.user_id} />
                ))}
            </div>
        </div>
    );
}

export default ManageUsers;