import React, { useState } from 'react';

const blankBook = { title: '', author: '', genre: '', isbn: '', quantity: '' };

function Books({ currentUser, books, addBook, updateBook, deleteBook }) {
  const isAdmin = currentUser.role === 'Admin';
  const [form, setForm] = useState(blankBook);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.genre.trim() || !form.isbn.trim() || Number(form.quantity) < 1) {
      setMessage('Please complete every field and enter a quantity of at least 1.'); return;
    }
    if (editingId) {
      const oldBook = books.find((book) => book.id === editingId);
      const quantity = Number(form.quantity);
      const borrowed = oldBook.quantity - oldBook.available;
      if (quantity < borrowed) { setMessage(`Quantity cannot be lower than the ${borrowed} copies currently borrowed.`); return; }
      updateBook({ ...oldBook, ...form, quantity, available: quantity - borrowed });
      setMessage('Book updated successfully.');
    } else {
      addBook(form);
      setMessage('Book added successfully.');
    }
    setForm(blankBook); setEditingId(null);
  };

  const editBook = (book) => { setEditingId(book.id); setForm({ title: book.title, author: book.author, genre: book.genre, isbn: book.isbn, quantity: book.quantity }); setMessage(''); window.scrollTo({top: 0, behavior: 'smooth'}); };

  return (
    <main className="page-shell">
      <section className="content-card">
        <p className="eyebrow">COLLECTION</p><h2>Book Management</h2>
        <p>{isAdmin ? 'Add, update, delete and view library books.' : 'Browse the library collection.'}</p>
        {isAdmin && <form className="form-grid" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Update Book' : 'Add New Book'}</h3>
          <label>Title<input value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} placeholder="Book title" /></label>
          <label>Author<input value={form.author} onChange={(e) => setForm({...form,author:e.target.value})} placeholder="Author name" /></label>
          <label>Genre<input value={form.genre} onChange={(e) => setForm({...form,genre:e.target.value})} placeholder="Romance, Classic, etc." /></label>
          <label>ISBN<input value={form.isbn} onChange={(e) => setForm({...form,isbn:e.target.value})} placeholder="ISBN" /></label>
          <label>Quantity<input type="number" min="1" value={form.quantity} onChange={(e) => setForm({...form,quantity:e.target.value})} placeholder="Quantity" /></label>
          <div className="form-actions"><button className="primary-button" type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>{editingId && <button className="secondary-button" type="button" onClick={() => {setEditingId(null);setForm(blankBook);}}>Cancel</button>}</div>
          {message && <p className="message">{message}</p>}
        </form>}
      </section>
      <section className="content-card"><h3>Library Books</h3><div className="table-wrap"><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Stock</th>{isAdmin && <th>Actions</th>}</tr></thead>
      <tbody>{books.map((book) => <tr key={book.id}><td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td><td>{book.available} / {book.quantity}</td>{isAdmin && <td className="actions"><button onClick={() => editBook(book)}>Edit</button><button className="danger-button" onClick={() => {if(window.confirm(`Delete ${book.title}?`)) deleteBook(book.id);}}>Delete</button></td>}</tr>)}</tbody></table></div></section>
    </main>
  );
}
export default Books;
