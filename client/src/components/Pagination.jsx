import useStore from "../store/store";

function Pagination() {
    const { page, totalPages, setPage } = useStore();

    return (
        <div className="table-pagination">
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
    );
}

export default Pagination;
