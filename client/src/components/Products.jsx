import { useState, useEffect } from "react";
import API_URL from "../util/api";
import useStore from "../store/store";
import SearchBar from "./SearchBar";
import AddProducts from "./AddProducts";
import ManageProducts from "./ManageProducts";
import ImportProducts from "./ImportProducts";
import Menu from "./Menu";

function Products() {
    const { setTitle, categories, setCategories, setStatusMessage, search, setSearch } = useStore();
    const [loading, setLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showImport, setShowImport] = useState(false);

    useEffect(() => {
        setTitle('Products');
        setStatusMessage('');
    }, [setStatusMessage, setTitle]);

    useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const response = await fetch(`${API_URL}/category?filter=all`, { credentials: 'include' });
                    const data = await response.json();
                    setCategories(data.categories);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    setStatusMessage('Error fetching categories', 'error');
                } finally {
                    setLoading(false);
                }
            };
            fetchCategories();
    }, [setCategories, setStatusMessage]);

    if (loading) {
        return <div className="dashboard-loading">Loading...</div>;
    }

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
                <button className="add-user-btn" onClick={() => setShowAddProduct(true)}>Add Product</button>
                <button className="add-user-btn" onClick={() => setShowImport(true)}>Import CSV</button>
            </div>
            <Menu />
            <ManageProducts categories={categories} />
            {showImport && (
                <ImportProducts onClose={() => setShowImport(false)} />
            )}
            {showAddProduct && (
                <div className="modal-overlay" onClick={() => setShowAddProduct(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowAddProduct(false)}>X</button>
                        <AddProducts categories={categories} onSuccess={() => setShowAddProduct(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Products;
