import React from 'react';

function Dashboard({ books, users, transactions }) {
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const availableCopies = books.reduce((sum, book) => sum + book.available, 0);
  const members = users.filter((user) => user.role === 'Member').length;
  const lowStock = books.filter((book) => book.available <= 1).length;

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">THE READING ROOM</p>
        <h2>Welcome to Chabalala Community Library</h2>
        <p>Manage books, members and borrowing records in one place.</p>
      </section>
      <section className="stats-grid">
        <div className="stat-card"><span>Book Titles</span><strong>{books.length}</strong></div>
        <div className="stat-card"><span>Total Copies</span><strong>{totalCopies}</strong></div>
        <div className="stat-card"><span>Available Copies</span><strong>{availableCopies}</strong></div>
        <div className="stat-card"><span>Members</span><strong>{members}</strong></div>
        <div className="stat-card"><span>Transactions</span><strong>{transactions.length}</strong></div>
        <div className="stat-card"><span>Low Stock</span><strong>{lowStock}</strong></div>
      </section>
      <section className="content-card">
        <h3>Current Collection</h3>
        <div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>Available</th></tr></thead>
        <tbody>{books.map((book) => <tr key={book.id}><td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.available} / {book.quantity}</td></tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
export default Dashboard;
