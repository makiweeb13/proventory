import useStore from "../store/store";
import { useEffect } from "react";

function Sales() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Sales');
    }, [setTitle]);

    return (
        <></>
    )
}

export default Sales;