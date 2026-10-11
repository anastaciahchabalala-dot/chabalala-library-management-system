# Chabalala Community Library Management System

A React-based Community Library Management System built for a Web Application Development assignment.

## Main features
- Login and member registration
- Dashboard with library statistics
- Book management: add, update, delete and view
- Stock management and borrowing
- Transaction history
- Admin-only user management
- Role-based access for Admin and Member
- Local Storage for saving application data
- React Router for page navigation

## Technologies
- React
- JavaScript
- JSX
- HTML/CSS
- React Router
- Browser Local Storage

## Admin demo account
**Membership ID:** `CHABALALA22`

The Admin can:
- Add books
- Update books
- Delete books
- Add stock
- View transactions
- Add, update and delete users
- Manage the library collection

## Member IDs
New members receive IDs in this style:
- `ID11`
- `ID12`
- `ID13`

The system continues from the highest existing member ID stored in the browser.

## How to run
1. Install Node.js.
2. Open this project folder in VS Code or another code editor.
3. Open Command Prompt/Terminal in the project folder.
4. Run:
   `npm install`
5. Then run:
   `npm start`
6. Open the local address shown by React (normally http://localhost:3000).

## Important Local Storage note
This project uses browser Local Storage rather than a server database. Therefore, each browser/device has its own saved library data. This is intentional for the assignment scope.

## Background image
The background uses a historic library photograph from Wikimedia Commons. The image is listed as a pre-2017 Unsplash image and is available under CC0/public-domain dedication on Wikimedia Commons.
Source page: https://commons.wikimedia.org/wiki/File:Library_Books_Bookshelves_(Unsplash).jpg
Original photographer: Davide Cantelli.

## Suggested demonstration order
1. Log in with `CHABALALA22`.
2. Open Dashboard.
3. Add a book from Books.
4. Edit the book.
5. Delete a test book.
6. Add stock / record a transaction.
7. Open Users and create a test member.
8. Log out.
9. Register a new member and confirm the generated ID (for example `ID11`).
10. Log in as the member and verify that admin-only Users management is unavailable.
