import { useState } from 'react';
import API_URL from '../util/api';
import useStore from '../store/store';

function AddStockModal({ product, onClose }) {
    const { setStatusMessage, updateProductStock } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (quantity < 1) return;
        setSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/product/${product.product_id}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setStatusMessage(`${quantity} units added to ${product.name}`);
                updateProductStock(product.product_id, data.product.stock);
                onClose();
            } else {
                setStatusMessage(data.message || 'Failed to add stock', 'error');
            }
        } catch (error) {
            setStatusMessage('Error adding stock', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h2>Add Stock</h2>
                <p className="modal-product-name">{product.name}</p>
                <p className="modal-current-stock">Current stock: {product.stock}</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="add-stock-qty">Quantity to add</label>
                        <input
                            id="add-stock-qty"
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="btn-group" style={{ marginTop: '1rem' }}>
                        <button className="edit-btn" type="submit" disabled={submitting}>
                            {submitting ? 'Adding...' : 'Add Stock'}
                        </button>
                        <button className="delete-btn" type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStockModal;
