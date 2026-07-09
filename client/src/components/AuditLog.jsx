import { useEffect, useState } from 'react';
import API_URL from '../util/api';
import useStore from '../store/store';
import SearchBar from './SearchBar';
import Menu from './Menu';
import Pagination from './Pagination';

function AuditLog() {
    const { setTitle, setTotalPages, search, setSearch, page, order, pageSize, setOrder, setSortBy } = useStore();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTitle('Audit Log');
        setOrder('desc');
        setSortBy('date');
    }, [setOrder, setSortBy, setTitle]);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/audit?search=${search}&page=${page}&order=${order}&pageSize=${pageSize}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setLogs(data.logs);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch audit logs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [search, page, order, pageSize, setTotalPages]);

    if (loading) return <div className="dashboard-loading">Loading audit log...</div>;

    return (
        <>
            <div className="users-controls">
                <SearchBar search={search} setSearch={setSearch} />
            </div>
            <Menu />
            <div className="transactions-container">
                <h2>Audit Log</h2>
                <div className="table-wrapper">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Action</th>
                                <th>Entity</th>
                                <th>Entity ID</th>
                                <th>Details</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length === 0 ? (
                                <tr><td colSpan="6">No audit records found</td></tr>
                            ) : logs.map(log => (
                                <tr key={log.audit_id}>
                                    <td>{log.users?.name || 'System'}</td>
                                    <td><span className="audit-action-badge">{formatAction(log.action)}</span></td>
                                    <td>{log.entity}</td>
                                    <td>{log.entity_id ?? '—'}</td>
                                    <td className="audit-details">{formatDetails(log.details)}</td>
                                    <td>{new Date(log.created_at).toLocaleString()}</td>
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

function formatAction(action) {
    return action.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDetails(details) {
    if (!details) return '—';
    try {
        const parsed = JSON.parse(details);
        return Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(', ');
    } catch {
        return details;
    }
}

export default AuditLog;