function CategoryRow({ category, isEditing, form,
  handleChange, startEdit, cancelEdit, handleEdit, handleDelete }) {

  if (isEditing) {
    return (
      <tr>
        <td><input type="text" name="name" value={form.name} onChange={handleChange} /></td>
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
      <td>{category.name}</td>
      <td>
        <div className="btn-group">
          <button className="edit-btn" onClick={() => startEdit(category)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(category)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryRow;
