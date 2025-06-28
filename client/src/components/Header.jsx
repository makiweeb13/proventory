import useStore from "../store/store";
function Header() {
    const { user } = useStore();

    return (
        <header>
            <h1>Proventory</h1>
            <h2>{user.name}</h2>
        </header>
    )
}

export default Header;