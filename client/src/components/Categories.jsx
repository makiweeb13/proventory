import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddCategories from "./AddCategories";
import ManageCategories from "./ManageCategories";

function Categories() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('Categories');
        setStatusMessage('');
    }, [setTitle, setStatusMessage]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <div className="side">
                <AddCategories />
                <ManageCategories />
            </div>
        </>
    )
}

export default Categories;