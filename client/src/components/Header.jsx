import useStore from "../store/store";
import ThemeToggle from "./ThemeToggle";

function Header() {
    const { title } = useStore();

    return (
        <header>
           <h2 className="header-title">{title}</h2>
           <ThemeToggle />
        </header>
    )
}

export default Header;
