import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

function Products() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Products');
    }, [setTitle]);

    return (
        <>
            <SearchBar />   
        </>
    )
}

export default Products;