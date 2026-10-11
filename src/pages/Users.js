import React, { useState } from 'react';

function Users({ users, currentUser, addUser, updateUser, deleteUser }) {
  const blank = { name: '', membershipId: '', role: 'Member' };
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.membershipId.trim()) { setMessage('Complete all fields.'); return; }
    const duplicate = users.some(u => u.membershipId.toLowerCase() === form.membershipId.trim().toLowerCase() && u.id !== editingId);
    if (duplicate) { setMessage('That Membership ID is already in use.'); return; }
    if (editingId) updateUser({ ...users.find(u=>u.id===editingId), ...form }); else addUser(form);
    setForm(blank); setEditingId(null); setMessage('User saved successfully.');
  };

  return <main className="page-shell"><section className="content-card"><p className="eyebrow">ADMINISTRATION</p><h2>User Management</h2><p>Add, update and remove members and administrators.</p>
    <form className="form-grid compact" onSubmit={submit}><h3>{editingId ? 'Update User' : 'Add User'}</h3><label>Full Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></label><label>Membership ID<input value={form.membershipId} onChange={e=>setForm({...form,membershipId:e.target.value})} /></label><label>Role<select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option>Member</option><option>Admin</option></select></label><div className="form-actions"><button className="primary-button">{editingId?'Update User':'Add User'}</button>{editingId&&<button type="button" className="secondary-button" onClick={()=>{setEditingId(null);setForm(blank)}}>Cancel</button>}</div>{message&&<p className="message">{message}</p>}</form></section>
    <section className="content-card"><h3>Registered Users</h3><div className="table-wrap"><table><thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr></thead><tbody>{users.map(user=><tr key={user.id}><td>{user.name}</td><td>{user.membershipId}</td><td>{user.role}</td><td className="actions"><button onClick={()=>{setEditingId(user.id);setForm({name:user.name,membershipId:user.membershipId,role:user.role});}}>Edit</button><button className="danger-button" disabled={user.id===currentUser.id} onClick={()=>{if(user.id!==currentUser.id&&window.confirm(`Delete ${user.name}?`))deleteUser(user.id);}}>Delete</button></td></tr>)}</tbody></table></div></section></main>;
}
export default Users;
