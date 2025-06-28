import useStore from "../store/store";
import { useEffect } from "react";

function Users() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Users');
    }, [setTitle]);

    return (
        <></>
    )
}

export default Users;