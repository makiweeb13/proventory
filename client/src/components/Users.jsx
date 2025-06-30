import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddUsers from "./AddUsers";
import ManageUsers from "./ManageUsers";

function Users() {
    const { setUsers } = useStore();
    const { setTitle } = useStore();

    const fetchUsers = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/user`, { credentials: 'include' });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        setTitle('Users');
    }, [setTitle]);

    return (
        <>
            <SearchBar />
            <div className="side">
                <AddUsers fetchUsers={fetchUsers} />
                <ManageUsers fetchUsers={fetchUsers} />
            </div>
        </>
    )
}

export default Users;