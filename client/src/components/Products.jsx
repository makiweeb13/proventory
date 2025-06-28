import useStore from "../store/store";
import { useEffect } from "react";

function Products() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Products');
    }, [setTitle]);

    return (
        <></>
    )
}

export default Products;