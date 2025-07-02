import { useState, useEffect } from 'react';
import User from './User';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageUsers({ fetchUsers }) {
    const { users, statusMessage, statusType } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
        setLoading(false);
    }, [fetchUsers]);

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