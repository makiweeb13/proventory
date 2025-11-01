import { useState, useEffect } from 'react';
import Product from './Product';
import useStore from '../store/store';
import StatusMessage from './StatusMessage';

function ManageProducts({ categories }) {
    const { products, statusMessage, statusType, setStatusMessage, setProducts, search, setTotalPages, page, order, pageSize } = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/product?search=${search}&order=${order}&page=${page}&pageSize=${pageSize}`, { credentials: 'include' });
                const data = await response.json();
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
                setStatusMessage('Error fetching products', 'error');
            }
        };
        fetchProducts();
        setLoading(false);
    }, [search, setStatusMessage, setProducts, setTotalPages, page, order, pageSize]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    
    return (
        <div className="manage-users-container">
            <h1 className="manage-users-title">Manage Products</h1>
            <StatusMessage message={statusMessage} type={statusType} />
            <div className="manage-users-list">
                {
                    products.length == 0 ? 'No products found' : 
                    products.map(product => (
                        <Product product={product} key={product.product_id} categories={categories} />
                    ))
                }
            </div>
        </div>
    );
}

export default ManageProducts;