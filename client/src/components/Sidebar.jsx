import { NavLink } from "react-router-dom";
import useStore from "../store/store";

function Sidebar() {
    const { user } = useStore();

    return ( 
        <aside className="sidebar">
            <h2 className="sidebar-title">Proventory</h2>
            <nav className="sidebar-nav">
                <NavLink to="/" className="sidebar-link">
                    Dashboard
                </NavLink>
                <NavLink to={`profile/${user.id}`} className="sidebar-link">
                    Profile
                </NavLink>
                { user.role === 'admin' &&
                    <>
                    <NavLink to="/users" className="sidebar-link">
                        Users
                    </NavLink>
                    <NavLink to="/categories" className="sidebar-link">
                        Categories
                    </NavLink>
                    <NavLink to="/products" className="sidebar-link">
                        Products
                    </NavLink>
                    </>
                }
                <NavLink to="/sales" className="sidebar-link">
                    Sales
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;