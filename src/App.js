import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Transactions from './pages/Transactions';
import Users from './pages/Users';

const ADMIN_ID = 'CHABALALA22';

const defaultBooks = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', isbn: '9780141439518', quantity: 4, available: 4 },
  { id: 2, title: 'Jane Eyre', author: 'Charlotte Bronte', genre: 'Romance', isbn: '9780141441146', quantity: 3, available: 3 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', isbn: '9780743273565', quantity: 3, available: 3 },
  { id: 4, title: 'Wuthering Heights', author: 'Emily Bronte', genre: 'Romance', isbn: '9780141439556', quantity: 2, available: 2 }
];

const defaultUsers = [
  { id: 1, name: 'Chabalala Library Administrator', membershipId: ADMIN_ID, role: 'Admin' }
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function App() {
  const [books, setBooks] = useState(() => loadData('chabalalaBooks', defaultBooks));
  const [users, setUsers] = useState(() => loadData('chabalalaUsers', defaultUsers));
  const [transactions, setTransactions] = useState(() => loadData('chabalalaTransactions', []));
  const [currentUser, setCurrentUser] = useState(() => loadData('chabalalaCurrentUser', null));

  useEffect(() => localStorage.setItem('chabalalaBooks', JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem('chabalalaUsers', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('chabalalaTransactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('chabalalaCurrentUser', JSON.stringify(currentUser)), [currentUser]);

  const login = (membershipId) => {
    const found = users.find((user) => user.membershipId.toLowerCase() === membershipId.trim().toLowerCase());
    if (!found) return { success: false, message: 'Membership ID not found.' };
    setCurrentUser(found);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  const registerUser = (name) => {
    const memberIds = users
      .filter((user) => user.role === 'Member' && /^ID\d+$/.test(user.membershipId))
      .map((user) => Number(user.membershipId.replace('ID', '')));
    const nextNumber = memberIds.length ? Math.max(...memberIds) + 1 : 11;
    const membershipId = `ID${nextNumber}`;
    const newUser = { id: Date.now(), name: name.trim(), membershipId, role: 'Member' };
    setUsers((previousUsers) => [...previousUsers, newUser]);
    return membershipId;
  };

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now(), quantity: Number(book.quantity), available: Number(book.quantity) };
    setBooks((previousBooks) => [...previousBooks, newBook]);
  };

  const updateBook = (updatedBook) => {
    setBooks((previousBooks) => previousBooks.map((book) => book.id === updatedBook.id ? updatedBook : book));
  };

  const deleteBook = (bookId) => {
    setBooks((previousBooks) => previousBooks.filter((book) => book.id !== bookId));
  };

  const changeStock = (bookId, amount, type) => {
    const quantity = Number(amount);
    const book = books.find((item) => item.id === Number(bookId));
    if (!book || quantity < 1) return { success: false, message: 'Enter a valid quantity.' };
    if (type === 'Borrow' && quantity > book.available) return { success: false, message: 'There are not enough available copies.' };

    setBooks((previousBooks) => previousBooks.map((item) => {
      if (item.id !== Number(bookId)) return item;
      return type === 'Borrow'
        ? { ...item, available: item.available - quantity }
        : { ...item, quantity: item.quantity + quantity, available: item.available + quantity };
    }));

    setTransactions((previousTransactions) => [
      {
        id: Date.now(),
        bookTitle: book.title,
        membershipId: currentUser.membershipId,
        type,
        quantity,
        date: new Date().toLocaleString()
      },
      ...previousTransactions
    ]);
    return { success: true };
  };

  const addUser = (user) => setUsers((previousUsers) => [...previousUsers, { ...user, id: Date.now() }]);
  const updateUser = (updatedUser) => setUsers((previousUsers) => previousUsers.map((user) => user.id === updatedUser.id ? updatedUser : user));
  const deleteUser = (userId) => setUsers((previousUsers) => previousUsers.filter((user) => user.id !== userId));

  return (
    <BrowserRouter>
      {currentUser && <Navbar currentUser={currentUser} logout={logout} />}
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login login={login} registerUser={registerUser} />} />
        <Route path="/" element={<ProtectedRoute currentUser={currentUser}><Dashboard books={books} users={users} transactions={transactions} /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute currentUser={currentUser}><Books currentUser={currentUser} books={books} addBook={addBook} updateBook={updateBook} deleteBook={deleteBook} /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute currentUser={currentUser}><Transactions currentUser={currentUser} books={books} transactions={transactions} changeStock={changeStock} /></ProtectedRoute>} />
        <Route path="/users" element={<AdminRoute currentUser={currentUser}><Users users={users} currentUser={currentUser} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} /></AdminRoute>} />
        <Route path="*" element={<Navigate to={currentUser ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ currentUser, children }) {
  return currentUser ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ currentUser, children }) {
  if (!currentUser) return <Navigate to="/login" replace />;
  return currentUser.role === 'Admin' ? children : <Navigate to="/" replace />;
}

export default App;
