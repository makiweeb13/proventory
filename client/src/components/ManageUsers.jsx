import { useState, useEffect } from 'react';
import User from './User';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageUsers() {
    const { users, statusMessage, statusType, setStatusMessage, setTotalPages, setUsers, search, page, order, pageSize } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/user?search=${search}&page=${page}&order=${order}&pageSize=${pageSize}`, { credentials: 'include' });
                const data = await response.json();
                setUsers(data.users);
                setTotalPages(data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setStatusMessage('Error fetching users', 'error');
            }
        };
        fetchUsers();
    }, [search, setStatusMessage, setUsers, page, order, pageSize, setTotalPages]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Users</h1>
            <StatusMessage message={statusMessage} type={statusType} />
            <div className="manage-users-list">
                {
                    users.length == 0 ? 'No users found' :
                    users.map(user => (
                        <User user={user} key={user.user_id} />
                    ))
                }
            </div>
        </div>
    );
}

export default ManageUsers;