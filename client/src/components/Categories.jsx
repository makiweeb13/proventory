import useStore from "../store/store";
import { useEffect } from "react";

function Categories() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Categories');
    }, [setTitle]);

    return (
        <></>
    )
}

export default Categories;