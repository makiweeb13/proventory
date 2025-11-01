import { useState, useEffect } from 'react';
import Category from './Category';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageCategories() {
    const { categories, statusMessage, statusType, setStatusMessage, setTotalPages, page, order, pageSize, setCategories, search } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/category?search=${search}&page=${page}&pageSize=${pageSize}&order=${order}`, { credentials: 'include' });
                const data = await response.json();
                setCategories(data.categories);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setStatusMessage('Error fetching categories', 'error');
            }
        };
        fetchCategories();
        setLoading(false);
    }, [search, setStatusMessage, setCategories, setTotalPages, page, order, pageSize]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Categories</h1>
            <StatusMessage message={statusMessage} type={statusType} />
            <div className="manage-users-list">
                {
                    categories.length == 0 ? 'No categories found' : 
                    categories.map(category => (
                        <Category category={category} key={category.category_id} />
                    ))
                }
            </div>
        </div>
    );
}

export default ManageCategories;