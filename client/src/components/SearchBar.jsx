import useStore from "../store/store";

function SearchBar({ search, setSearch }) {

    const { title } = useStore();

    const handleChange = e => {
        setSearch(e.target.value);
    }

    return (
        <div className="search-bar">
        <input
            type="text"
            placeholder={`Search ${title == 'Sales' ? 'Products' : title}...`}
            value={search}
            onChange={handleChange}
        />
        </div>
    );
}

export default SearchBar;