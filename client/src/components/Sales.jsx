import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddSales from "./AddSales";

function Sales() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('Sales');
        setStatusMessage('');
    }, [setStatusMessage, setTitle]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <AddSales />
        </>
    )
}

export default Sales;