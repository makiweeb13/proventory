import { useState, useEffect } from 'react';
import useStore from '../store/store';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setUser } = useStore();

    useEffect(() => {
        const checkAuth = async () => {
            const API_URL = import.meta.env.VITE_API_URL;
            try {
                const response = await fetch(`${API_URL}/user/me`, { credentials: 'include' });
                if (!response.ok) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }
                const data = await response.json();
                if (
                    data &&
                    typeof data.id !== 'undefined' &&
                    typeof data.name === 'string' &&
                    typeof data.email === 'string' &&
                    typeof data.role === 'string'
                ) {
                    setIsAuthenticated(true);
                    setUser(data);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking authentication', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setUser]);

    return { isAuthenticated, loading };
};

export default useAuth;