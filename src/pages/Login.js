import React, { useState } from 'react';

function Login({ login, registerUser }) {
  const [mode, setMode] = useState('login');
  const [membershipId, setMembershipId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [newId, setNewId] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const result = login(membershipId);
    if (!result.success) setMessage(result.message);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (!name.trim()) { setMessage('Please enter your full name.'); return; }
    const id = registerUser(name);
    setNewId(id);
    setMessage('Registration successful. Save your Membership ID before leaving this page.');
    setName('');
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">CHABALALA COMMUNITY LIBRARY</p>
        <h1>{mode === 'login' ? 'Welcome Back' : 'Join the Library'}</h1>
        <p className="subtitle">A quiet place for stories, classics and new beginnings.</p>

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <label>Membership ID</label>
            <input value={membershipId} onChange={(e) => setMembershipId(e.target.value)} placeholder="Enter your Membership ID" required />
            <button className="primary-button" type="submit">Login</button>
            <p className="switch-text">New member? <button type="button" className="text-button" onClick={() => {setMode('register');setMessage('');}}>Register here</button></p>
            <p className="demo-note">Admin demo ID: <strong>CHABALALA22</strong></p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />
            <button className="primary-button" type="submit">Register</button>
            {newId && <div className="new-id"><span>Your Membership ID</span><strong>{newId}</strong></div>}
            <p className="switch-text">Already a member? <button type="button" className="text-button" onClick={() => {setMode('login');setMessage('');setNewId('');}}>Back to Login</button></p>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </section>
    </main>
  );
}
export default Login;
