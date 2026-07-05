import { useState } from "react";
import useStore from "../store/store";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import AddUsers from "./AddUsers";
import ManageUsers from "./ManageUsers";
import Menu from "./Menu";

function Users() {
    const { setTitle, search, setSearch, setStatusMessage } = useStore();
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddUser, setShowAddUser] = useState(false);

    useEffect(() => {
        setTitle('Users');
        setStatusMessage('');
    }, [setTitle, setStatusMessage]);

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
                <button className="add-user-btn" onClick={() => setShowAddUser(true)}>Add User</button>
            </div>
            <Menu>
                <label>
                    <span>Status:</span>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </label>
            </Menu>
            <ManageUsers statusFilter={statusFilter} />
            {showAddUser && (
                <div className="modal-overlay" onClick={() => setShowAddUser(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowAddUser(false)}>X</button>
                        <AddUsers onSuccess={() => setShowAddUser(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Users;
