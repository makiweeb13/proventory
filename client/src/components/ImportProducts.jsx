import { useState, useRef } from 'react';
import API_URL from '../util/api';
import useStore from '../store/store';

function ImportProducts({ onClose }) {
    const { setStatusMessage } = useStore();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState([]);
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState(null);
    const fileRef = useRef();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        setResult(null);

        const reader = new FileReader();
        reader.onload = (ev) => {
            const text = ev.target.result;
            const lines = text.split('\n').filter(l => l.trim());
            if (lines.length < 2) {
                setPreview([]);
                return;
            }
            const headers = lines[0].split(',').map(h => h.trim());
            const rows = lines.slice(1, 6).map(line => {
                const vals = line.split(',').map(v => v.trim());
                const obj = {};
                headers.forEach((h, i) => obj[h] = vals[i] || '');
                return obj;
            });
            setPreview(rows);
        };
        reader.readAsText(selected);
    };

    const handleImport = async () => {
        if (!file) return;
        setImporting(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${API_URL}/product/import`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setResult({ type: 'success', message: data.message, errors: data.errors });
                setStatusMessage(data.message);
            } else {
                setResult({ type: 'error', message: data.message || 'Import failed', errors: [] });
            }
        } catch (error) {
            setResult({ type: 'error', message: 'Error importing products', errors: [] });
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content import-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h2>Import Products from CSV</h2>
                <p className="import-hint">CSV must include headers: <code>name, stock, buying_price, selling_price, category_id</code></p>

                <div className="import-file-area">
                    <input
                        ref={fileRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="import-file-input"
                    />
                    <button className="edit-btn" onClick={() => fileRef.current.click()}>
                        Choose File
                    </button>
                    {file && <span className="import-filename">{file.name}</span>}
                </div>

                {preview.length > 0 && (
                    <div className="import-preview">
                        <h3>Preview (first {preview.length} rows)</h3>
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Stock</th>
                                    <th>Buying Price</th>
                                    <th>Selling Price</th>
                                    <th>Category ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preview.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.name}</td>
                                        <td>{row.stock}</td>
                                        <td>{row.buying_price}</td>
                                        <td>{row.selling_price}</td>
                                        <td>{row.category_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {result && (
                    <div className={`import-result import-result-${result.type}`}>
                        <p>{result.message}</p>
                        {result.errors.length > 0 && (
                            <ul>
                                {result.errors.slice(0, 5).map((e, i) => (
                                    <li key={i}>Line {e.line}: {e.error}</li>
                                ))}
                                {result.errors.length > 5 && <li>...and {result.errors.length - 5} more</li>}
                            </ul>
                        )}
                    </div>
                )}

                <div className="btn-group" style={{ marginTop: '1rem' }}>
                    <button
                        className="edit-btn"
                        onClick={handleImport}
                        disabled={!file || importing}
                    >
                        {importing ? 'Importing...' : 'Import'}
                    </button>
                    <button className="delete-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ImportProducts;
