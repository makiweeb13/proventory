import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

function Categories() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Categories');
    }, [setTitle]);

    return (
        <>
            <SearchBar />
        </>
    )
}

export default Categories;