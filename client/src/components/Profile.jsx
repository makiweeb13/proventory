import API_URL from "../util/api";
import useStore from "../store/store";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, setTitle, setUser } = useStore();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const navigate = useNavigate();
    const isOwnProfile = user && parseInt(id) === user.id;

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await fetch(`${API_URL}/user/${id}`, { credentials: 'include' });
                if (!response.ok) {
                    console.error('Failed to fetch profile');
                    setLoading(false);
                    return;
                }
                const data = await response.json();
                setProfile(data);
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        setTitle('Profile');
        getProfile();
    }, [id, setTitle]);

    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/user/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Profile updated successfully');
                setMessageType('success');
                setProfile(data.user);
                setUser({ ...user, name: data.user.name, email: data.user.email });
                setEditing(false);
            } else {
                setMessage(data.message || 'Failed to update profile');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error updating profile');
            setMessageType('error');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageType('error');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/user/change-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Password changed successfully');
                setMessageType('success');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setChangingPassword(false);
            } else {
                setMessage(data.message || 'Failed to change password');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error changing password');
            setMessageType('error');
        }
    };

    return (
        <div className="profile-container">
            {loading ? (
                <p className="profile-loading">Loading...</p>
            ) : profile ? (
                <div className="profile-card">
                    <div className="profile-avatar">
                        {profile.name ? profile.name[0].toUpperCase() : "?"}
                    </div>

                    {message && (
                        <p className={`status-message status-${messageType}`}>{message}</p>
                    )}

                    {editing ? (
                        <div className="profile-edit-form">
                            <div className="form-group">
                                <label htmlFor="edit-name">Name</label>
                                <input id="edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-email">Email</label>
                                <input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="btn-group">
                                <button className="edit-btn" onClick={handleSaveProfile}>Save</button>
                                <button className="delete-btn" onClick={() => { setEditing(false); setName(profile.name); setEmail(profile.email); }}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="profile-name">{profile.name}</h2>
                            <div className="profile-info">
                                <div>
                                    <span className="profile-label">Email:</span>
                                    <span>{profile.email}</span>
                                </div>
                                <div>
                                    <span className="profile-label">Role:</span>
                                    <span className={`profile-role profile-role-${profile.role}`}>{profile.role}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {isOwnProfile && !editing && (
                        <>
                            <button className="profile-edit-btn" onClick={() => setEditing(true)}>
                                Edit Profile
                            </button>
                            <button className="profile-password-btn" onClick={() => setChangingPassword(!changingPassword)}>
                                {changingPassword ? 'Cancel' : 'Change Password'}
                            </button>
                        </>
                    )}

                    {changingPassword && (
                        <div className="profile-password-form">
                            <div className="form-group">
                                <label htmlFor="old-password">Current Password</label>
                                <input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-password">New Password</label>
                                <input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm-password">Confirm New Password</label>
                                <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <button className="edit-btn" onClick={handleChangePassword}>Update Password</button>
                        </div>
                    )}

                    <button className="profile-logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p className="profile-error">Profile not found.</p>
            )}
        </div>
    )
}

export default Profile;
