import { NavLink } from "react-router-dom";
import useStore from "../store/store";
import proventoryLogo from "../assets/proventory-logo.png"; // Assuming you have a logo image

function Sidebar({ isOpen, onClose }) {
    const { user } = useStore();

    return ( 
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-close" onClick={onClose} aria-label="Close menu">&times;</button>
            <div className="sidebar-header">
                <img src={proventoryLogo} alt="Proventory Logo" />
                <h1 className="sidebar-title">Proventory</h1>
            </div>
            <nav className="sidebar-nav" onClick={onClose}>
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
                <NavLink to="/transactions" className="sidebar-link">
                    Transactions
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar;