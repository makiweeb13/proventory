import { useState } from "react";
import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddCategories from "./AddCategories";
import ManageCategories from "./ManageCategories";
import Menu from "./Menu";

function Categories() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();
    const [showAddCategory, setShowAddCategory] = useState(false);

    useEffect(() => {
        setTitle('Categories');
        setStatusMessage('');
    }, [setTitle, setStatusMessage]);

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
                <button className="add-user-btn" onClick={() => setShowAddCategory(true)}>Add Category</button>
            </div>
            <Menu />
            <ManageCategories />
            {showAddCategory && (
                <div className="modal-overlay" onClick={() => setShowAddCategory(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowAddCategory(false)}>X</button>
                        <AddCategories onSuccess={() => setShowAddCategory(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Categories;
