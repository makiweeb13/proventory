import useStore from "../store/store";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import AddProducts from "./AddProducts";
import ManageProducts from "./ManageProducts"

function Products() {
    const { setTitle, setCategories, setStatusMessage, search, setSearch } = useStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTitle('Products');
        setStatusMessage('');
    }, [setStatusMessage, setTitle]);

    useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const API_URL = import.meta.env.VITE_API_URL;
                    const response = await fetch(`${API_URL}/category`, { credentials: 'include' });
                    const data = await response.json();
                    setCategories(data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    setStatusMessage('Error fetching categories', 'error');
                }
            };
            fetchCategories();
            setLoading(false);
    }, [setCategories, setStatusMessage]);

    if (loading) {
        return <h1>Loading..</h1>
    } 

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />   
            <div className="side">
                <AddProducts />
                <ManageProducts />
            </div>
        </>
    )
}

export default Products;