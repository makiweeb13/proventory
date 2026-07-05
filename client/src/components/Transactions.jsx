import { useEffect, useState } from "react";
import useStore from "../store/store";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import Pagination from "./Pagination";

function Transactions() {
    const { setTitle, setTotalPages, search, setSearch, page, order, pageSize, setOrder, setSortBy } = useStore();

    useEffect(() => {
        setTitle('Transactions');
        setOrder('desc');
        setSortBy('date');
    }, [setOrder, setSortBy, setTitle]);

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            const API_URL = import.meta.env.VITE_API_URL;
            try {
                const response = await fetch(`${API_URL}/sale/transactions?search=${search}&page=${page}&order=${order}&pageSize=${pageSize}`, {
                    credentials: "include"
                });
                const data = await response.json();
                setTransactions(data.transactions);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [order, page, pageSize, search, setTotalPages]);

    const handleExportCSV = () => {
        const headers = ['Product', 'Sold By', 'Amount', 'Date'];
        const csvRows = [headers.join(',')];
        transactions.forEach(t => {
            const row = [
                t.products.name,
                t.users.name,
                Number(t.amount).toFixed(2),
                new Date(t.sale_date).toLocaleDateString()
            ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
            csvRows.push(row);
        });
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="dashboard-loading">Loading transactions...</div>;

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
                <button className="add-user-btn" onClick={handleExportCSV}>Export CSV</button>
            </div>
            <Menu />
            <div className="transactions-container">
                <h2>Recent Sales</h2>
                <div className="table-wrapper">
                    <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Sold By</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr><td colSpan="4">No transactions yet</td></tr>
                        ) : transactions.map((transaction) => (
                            <tr key={transaction.sales_id}>
                                <td>{transaction.products.name}</td>
                                <td>{transaction.users.name}</td>
                                <td>₱{Number(transaction.amount).toFixed(2)}</td>
                                <td>{new Date(transaction.sale_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    );
}

export default Transactions;
