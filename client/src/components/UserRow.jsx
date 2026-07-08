const STATUS_COLORS = {
  active: '#16a34a',
  inactive: '#6b7280',
  suspended: '#ea580c',
  deleted: '#dc2626'
};

function UserRow({ user, isEditing, form, editStatus, editRole, currentUser,
  handleChange, startEdit, cancelEdit, handleEdit, handleDeactivate,
  setEditRole, setEditStatus }) {

  if (isEditing) {
    return (
      <tr>
        <td><input type="text" name="name" value={form.name} onChange={handleChange} /></td>
        <td><input type="email" name="email" value={form.email} onChange={handleChange} /></td>
        <td>
          {currentUser?.role === 'admin' && user.user_id !== currentUser?.id ? (
            <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="status-select">
              <option value="user">Staff</option>
              <option value="admin">Admin</option>
            </select>
          ) : (
            <span className="capitalize">{editRole === 'user' ? 'Staff' : editRole}</span>
          )}
        </td>
        <td>
          {currentUser?.role === 'admin' ? (
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="status-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="deleted">Deleted</option>
            </select>
          ) : (
            <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[editStatus] || '#6b7280' }}>
              {editStatus}
            </span>
          )}
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
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td className="capitalize">{user.role === 'user' ? 'Staff' : user.role}</td>
      <td>
        <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[user.account_status] || '#6b7280' }}>
          {user.account_status}
        </span>
      </td>
      <td>
        <div className="btn-group">
          <button className="edit-btn" onClick={() => startEdit(user)}>Edit</button>
          {user.role !== 'admin' && user.account_status !== 'deleted' && (
            <button className="delete-btn" onClick={() => handleDeactivate(user)}>Deactivate</button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserRow;
