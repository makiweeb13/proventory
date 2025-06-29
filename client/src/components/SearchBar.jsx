import useStore from "../store/store";

function SearchBar({ searchTerm, setSearchTerm }) {

    const { title } = useStore();

    return (
        <div className="search-bar">
        <input
            type="text"
            placeholder={`Search ${title == 'Sales' ? 'Products' : title}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    );
}

export default SearchBar;