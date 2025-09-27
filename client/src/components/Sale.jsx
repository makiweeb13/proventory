import { useState } from "react";
import useStore from "../store/store";

function Sale({ product }) {

    const { setStatusMessage, user, updateProduct } = useStore();

    const [form, setForm] = useState({
        product_id: product.product_id,
        user_id: user.id,
        quantity: 1,
        selling_price: product.selling_price
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${API_URL}/sale`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
                credentials: 'include'
            });
            if (!response.ok) throw new Error("Failed to add sale");
            const data = await response.json();
            setStatusMessage(data.message);
            updateProduct(data.product);
        } catch (error) {
            setStatusMessage(`Error adding sale: ${error.message}`, "error");
        }
    }

    return (
        <div className="user-card">
            <div className="user-field">
                <label>Product:</label>
                <p>{product.name}</p>
            </div>
            <div className="user-field">
                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min={1}
                />
            </div>
            <div className="user-field">
                <label>Selling Price:</label>
                <p><span>&#8369;</span>{Number(form.selling_price).toFixed(2)}</p>
            </div>
            <div className="user-actions">
                <button className="add-btn" onClick={() => handleAdd()}>Add</button>
            </div>
        </div>
    );
}

export default Sale;