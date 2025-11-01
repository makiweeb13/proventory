import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddSales from "./AddSales";
import Menu from "./Menu";

function Sales() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('Sales');
        setStatusMessage('');
    }, [setStatusMessage, setTitle]);

    return (
        <>
            <div className="side">
                <SearchBar search={search} setSearch={setSearch} />
                <Menu />
            </div>
            <div className="side">
                <AddSales />
            </div>
        </>
    )
}

export default Sales;