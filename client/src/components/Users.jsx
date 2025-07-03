import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddUsers from "./AddUsers";
import ManageUsers from "./ManageUsers";

function Users() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('Users');
        setStatusMessage('');
    }, [setTitle, setStatusMessage]);

    return (
        <>
            <SearchBar search={search} setSearch={setSearch} />
            <div className="side">
                <AddUsers />
                <ManageUsers />
            </div>
        </>
    )
}

export default Users;