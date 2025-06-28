import useStore from "../store/store";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { setTitle, setUser } = useStore();
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const API_URL = import.meta.env.VITE_API_URL;
            try {
                const response = await fetch(`${API_URL}/user/${id}`, { credentials: 'include' });
                if (!response.ok) {
                    console.error('Failed to fetch profile');
                    return;
                }
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        setTitle('Profile');
        getProfile();
    }, [id, setTitle]);

    const handleLogout = async () => {
        const API_URL = import.meta.env.VITE_API_URL;
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

    return (
        <div className="profile-container">
            {loading ? (
                <p className="profile-loading">Loading...</p>
            ) : profile ? (
                <div className="profile-card">
                    <div className="profile-avatar">
                        {profile.name ? profile.name[0].toUpperCase() : "?"}
                    </div>
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