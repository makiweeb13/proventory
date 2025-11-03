import { useEffect, useState } from "react";
import useStore from "../store/store";
import SearchBar from "./SearchBar";
import Menu from "./Menu";

function Transactions() {
    const { setTitle, setTotalPages, search, setSearch, page, order, pageSize, setOrder, setSortBy } = useStore();

    useEffect(() => {
        setTitle('Transactions');
        setOrder('desc');
        setSortBy('date');
    }, [setOrder, setSortBy, setTitle]);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
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
            }
        };

        fetchTransactions();
    }, [order, page, pageSize, search, setTotalPages]);

    return (
        <>
            <div className="side">
                <SearchBar search={search} setSearch={setSearch} />
                <Menu />
            </div>
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
                        {transactions.map((transaction) => (
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
            </div>
        </>
    );
}

export default Transactions;