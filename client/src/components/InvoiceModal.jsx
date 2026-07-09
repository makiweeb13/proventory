import { useRef } from "react";

function InvoiceModal({ sale, product, user, customerName, onClose }) {
    const printRef = useRef();

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Invoice</title>
                <style>
                    body { font-family: system-ui, monospace; padding: 2rem; max-width: 320px; margin: 0 auto; }
                    h1 { text-align: center; font-size: 1.2rem; margin-bottom: 0.25rem; }
                    .shop { text-align: center; color: #666; font-size: 0.85rem; margin-bottom: 1rem; }
                    hr { border: none; border-top: 1px dashed #999; }
                    .row { display: flex; justify-content: space-between; padding: 0.25rem 0; }
                    .total { font-weight: bold; font-size: 1.1rem; border-top: 2px solid #000; padding-top: 0.5rem; margin-top: 0.5rem; }
                    .footer { text-align: center; color: #888; font-size: 0.75rem; margin-top: 1.5rem; }
                    .label { color: #666; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                <h1>PROVENTORY</h1>
                <p class="shop">Inventory Management System</p>
                <hr/>
                <p class="row"><span class="label">Receipt #:</span><span>${sale.sales_id}</span></p>
                <p class="row"><span class="label">Date:</span><span>${new Date(sale.sale_date).toLocaleDateString()}</span></p>
                <p class="row"><span class="label">Cashier:</span><span>${user.name}</span></p>
                ${customerName ? `<p class="row"><span class="label">Customer:</span><span>${customerName}</span></p>` : ''}
                <hr/>
                <p class="row"><span class="label">Item:</span><span>${product.name}</span></p>
                <p class="row"><span class="label">Qty:</span><span>${sale.quantity}</span></p>
                <p class="row"><span class="label">Price:</span><span>₱${Number(product.selling_price).toFixed(2)}</span></p>
                <p class="row total"><span>TOTAL:</span><span>₱${Number(sale.amount).toFixed(2)}</span></p>
                <hr/>
                <p class="footer">Thank you for your purchase!</p>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 300);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content invoice-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <div className="invoice" ref={printRef}>
                    <h1 className="invoice-title">PROVENTORY</h1>
                    <p className="invoice-subtitle">Official Receipt</p>
                    <hr className="invoice-hr" />
                    <div className="invoice-row">
                        <span className="invoice-label">Receipt #:</span>
                        <span>{sale.sales_id}</span>
                    </div>
                    <div className="invoice-row">
                        <span className="invoice-label">Date:</span>
                        <span>{new Date(sale.sale_date).toLocaleDateString()}</span>
                    </div>
                    <div className="invoice-row">
                        <span className="invoice-label">Cashier:</span>
                        <span>{user.name}</span>
                    </div>
                    {customerName && (
                        <div className="invoice-row">
                            <span className="invoice-label">Customer:</span>
                            <span>{customerName}</span>
                        </div>
                    )}
                    <hr className="invoice-hr" />
                    <div className="invoice-row">
                        <span className="invoice-label">Item:</span>
                        <span>{product.name}</span>
                    </div>
                    <div className="invoice-row">
                        <span className="invoice-label">Qty:</span>
                        <span>{sale.quantity}</span>
                    </div>
                    <div className="invoice-row">
                        <span className="invoice-label">Price:</span>
                        <span>₱{Number(product.selling_price).toFixed(2)}</span>
                    </div>
                    <div className="invoice-row invoice-total">
                        <span>TOTAL:</span>
                        <span>₱{Number(sale.amount).toFixed(2)}</span>
                    </div>
                    <hr className="invoice-hr" />
                    <p className="invoice-footer">Thank you for your purchase!</p>
                </div>
                <button className="print-btn invoice-print-btn" onClick={handlePrint}>
                    &#128424; Print Receipt
                </button>
            </div>
        </div>
    );
}

export default InvoiceModal;