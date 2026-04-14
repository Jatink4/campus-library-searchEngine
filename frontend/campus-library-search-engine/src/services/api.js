const BASE = "http://localhost:8000";

export const loginAdmin = (password) =>
fetch(`${BASE}/admin/login?password=${password}`,{method:"POST"});

export const addBook = (data) =>
fetch(`${BASE}/admin/add-book`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
});

export const getBooks = () =>
fetch(`${BASE}/admin/books`);

export const deleteBook = (id) =>
fetch(`${BASE}/admin/delete-book/${id}`,{
method:"DELETE"
});

export const searchBooks = (query) =>
fetch(`${BASE}/search?query=${query}`);