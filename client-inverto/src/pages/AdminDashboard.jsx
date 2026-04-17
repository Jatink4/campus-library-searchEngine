import AddBookForm from "./AddBookForm";
import BookList from "./BookList";
import SearchBar from "../components/SearchBar";

function AdminDashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a", // dark navy
      padding: "20px",
      fontFamily: "Arial",
      color: "#e2e8f0"
    }}>
      
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #1e293b, #334155)",
        color: "#f8fafc",
        padding: "15px 25px",
        borderRadius: "12px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <h2>Admin Dashboard</h2>

        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/admin";
          }}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <h3 style={{color:"#38bdf8"}}>Search Books</h3>
        <SearchBar />
      </div>

      {/* Add Book */}
      <div style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <h3 style={{color:"#22c55e"}}>Add New Book</h3>
        <AddBookForm />
      </div>

      {/* Book List */}
      <div style={{
        background: "#020617",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <h3 style={{color:"#a78bfa"}}>All Books</h3>
        <BookList />
      </div>

    </div>
  );
}

export default AdminDashboard;