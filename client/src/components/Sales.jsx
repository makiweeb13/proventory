import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

function Sales() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Sales');
    }, [setTitle]);

    return (
        <>
            <SearchBar />
        </>
    )
}

export default Sales;