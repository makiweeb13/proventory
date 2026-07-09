import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddSales from "./AddSales";
import Menu from "./Menu";

function Sales() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('New Sale');
        setStatusMessage('');
    }, [setStatusMessage, setTitle]);

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
            </div>
            <Menu />
            <AddSales />
        </>
    )
}

export default Sales;
