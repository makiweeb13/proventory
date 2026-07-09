function ProductRow({ product, isEditing, form, categories, isAdmin,
  handleChange, startEdit, cancelEdit, handleEdit, handleDelete, onAddStock }) {

  if (isEditing) {
    return (
      <tr>
        <td><input type="text" name="name" value={form.name} onChange={handleChange} /></td>
        <td><input type="number" name="stock" value={form.stock} onChange={handleChange} min={0} /></td>
        {isAdmin && (
          <td><input type="number" name="buying_price" value={form.buying_price} onChange={handleChange} /></td>
        )}
        <td><input type="number" name="selling_price" value={form.selling_price} onChange={handleChange} /></td>
        <td>
          <select name="category_id" value={form.category_id} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
            ))}
          </select>
        </td>
        <td>
          <div className="btn-group">
            <button className="edit-btn" onClick={handleEdit}>Save</button>
            <button className="delete-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {product.stock}
        {product.stock <= 10 && product.stock > 0 && (
          <span className="low-stock-badge">Low</span>
        )}
        {product.stock === 0 && (
          <span className="out-of-stock-badge">Out</span>
        )}
      </td>
      {isAdmin && <td>&#8369;{Number(product.buying_price).toFixed(2)}</td>}
      <td>&#8369;{Number(product.selling_price).toFixed(2)}</td>
      <td>{categories.find(c => c.category_id === product.category_id)?.name || 'N/A'}</td>
      <td>
        <div className="btn-group">
          <button className="add-btn" onClick={() => onAddStock(product)}>+ Stock</button>
          <button className="edit-btn" onClick={() => startEdit(product)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(product)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
