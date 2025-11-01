import useStore from "../store/store";
import { useEffect } from "react";

function Menu() {
    const { page, search, totalPages, pageSize, order, sortBy, setPage, setPageSize, setOrder, setSortBy } = useStore();

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
            </div>
            <div className="menu-pagination">
                <button onClick={() => setPage(1)} disabled={page === 1}>&lt;&lt;</button>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
                <input
                    type="number"
                    value={page}
                    onChange={(e) => setPage(Number(e.target.value) < 1 || Number(e.target.value) > totalPages ? 1 : Number(e.target.value))}
                    min={1}
                    max={totalPages}
                    style={{ width: "3rem", textAlign: "center" }}
                />
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>&gt;</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default Menu;