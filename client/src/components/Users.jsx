import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddUsers from "./AddUsers";
import ManageUsers from "./ManageUsers";
import Menu from "./Menu";

function Users() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();

    useEffect(() => {
        setTitle('Users');
        setStatusMessage('');
    }, [setTitle, setStatusMessage]);

    return (
        <>
            <div className="side">
                <SearchBar search={search} setSearch={setSearch} />
                <Menu />
            </div>
            <div className="side">
                <AddUsers />
                <ManageUsers />
            </div>
        </>
    )
}

export default Users;