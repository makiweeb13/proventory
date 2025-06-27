import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        
       setIsAuthenticated(true);
       setLoading(false);

        // Simulate an API call to check authentication status
        // In a real application, you would replace this with an actual API call
        // fetch('/api/auth/status')
        //     .then(response => response.json())
        //     .then(data => {
        //         setIsAuthenticated(data.isAuthenticated);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setIsAuthenticated(false);
        //         setLoading(false);
        //     });
    }, []);

    return { isAuthenticated, loading }; 
};

export default useAuth;