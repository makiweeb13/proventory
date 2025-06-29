import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddUsers from "./AddUsers";

function Users() {
    const { setTitle } = useStore();

    useEffect(() => {
        setTitle('Users');
    }, [setTitle]);

    return (
        <>
            <SearchBar />
            <AddUsers />
        </>
    )
}

export default Users;