import React, { useState } from 'react';

function Transactions({ currentUser, books, transactions, changeStock }) {
  const [bookId, setBookId] = useState('');
  const [type, setType] = useState(currentUser.role === 'Admin' ? 'Add' : 'Borrow');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const result = changeStock(bookId, quantity, type);
    setMessage(result.message || (result.success ? `${type} transaction completed.` : 'Something went wrong.'));
    if (result.success) { setBookId(''); setQuantity(1); }
  };

  return (
    <main className="page-shell">
      <section className="content-card"><p className="eyebrow">CIRCULATION</p><h2>Transactions</h2><p>Record stock additions and book borrowing activity.</p>
        <form className="transaction-form" onSubmit={submit}>
          <label>Book<select value={bookId} onChange={(e)=>setBookId(e.target.value)} required><option value="">Select a book</option>{books.map(book=><option key={book.id} value={book.id}>{book.title} ({book.available} available)</option>)}</select></label>
          <label>Transaction Type<select value={type} onChange={(e)=>setType(e.target.value)}>{currentUser.role === 'Admin' && <option value="Add">Add Stock</option>}<option value="Borrow">Borrow</option></select></label>
          <label>Quantity<input type="number" min="1" value={quantity} onChange={(e)=>setQuantity(e.target.value)} /></label>
          <button className="primary-button" type="submit">Save Transaction</button>
          {message && <p className="message">{message}</p>}
        </form>
      </section>
      <section className="content-card"><h3>Transaction History</h3><div className="table-wrap"><table><thead><tr><th>Date</th><th>Member ID</th><th>Book</th><th>Type</th><th>Quantity</th></tr></thead><tbody>{transactions.length===0 ? <tr><td colSpan="5">No transactions recorded yet.</td></tr> : transactions.map(t=><tr key={t.id}><td>{t.date}</td><td>{t.membershipId}</td><td>{t.bookTitle}</td><td>{t.type}</td><td>{t.quantity}</td></tr>)}</tbody></table></div></section>
    </main>
  );
}
export default Transactions;
