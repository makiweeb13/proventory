import useStore from "../store/store";
function Header() {
    const { title } = useStore();

    return (
        <header>
           <h2 className="header-title">{title}</h2>
        </header>
    )
}

export default Header;