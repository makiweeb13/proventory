import useStore from "../store/store";
import { useEffect } from "react";

function Menu({ children }) {
    const { search, pageSize, order, sortBy, setPage, setPageSize, setOrder, setSortBy } = useStore();

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
        setPage(1);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    useEffect(() => {
        setPage(1);
        setOrder('asc');
        setSortBy('alphabetical');
        setPageSize(5);
    }, [search, setOrder, setPage, setPageSize, setSortBy]);

    return (
        <div className="menu-container">
            <div className="menu-controls">
                <label>
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="date">Date</option>
                    </select>
                </label>
                <label>
                    <span>Order:</span>
                    <select value={order} onChange={handleOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
                <label>
                    <span>Show:</span>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
                {children}
            </div>
        </div>
    );
}

export default Menu;