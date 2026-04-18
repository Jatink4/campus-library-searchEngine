import { useState } from "react";
import { addBook } from "../services/api";

function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

    const submit = async () => {
    await addBook({
    title: title,
    authors: [author],
    publisher: "",
    publication_year: 2024,
    isbn: "",
    description: "",
    tags: [],
    categories: [],
    edition: "1st",
    pages: 100,
    language: "English"
  });

  alert("Book Added");
};

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#e2e8f0",
    outline: "none",
    transition: "all 0.3s ease"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  return (
    <div style={{ padding: "10px", marginTop: "10px" }}>
      
      <br />

      <input
        placeholder="Title"
        style={inputStyle}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={(e) => {
          e.target.style.border = "1px solid #22c55e";
          e.target.style.boxShadow = "0 0 8px #22c55e";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid #334155";
          e.target.style.boxShadow = "none";
        }}
      />

      <input
        placeholder="Author"
        style={inputStyle}
        onChange={(e) => setAuthor(e.target.value)}
        onFocus={(e) => {
          e.target.style.border = "1px solid #22c55e";
          e.target.style.boxShadow = "0 0 8px #22c55e";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid #334155";
          e.target.style.boxShadow = "none";
        }}
      />

      <button
        style={buttonStyle}
        onClick={submit}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 5px 15px rgba(34,197,94,0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
        }}
        onMouseDown={(e) => {
          e.target.style.transform = "scale(0.95)";
        }}
        onMouseUp={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
      >
        Add
      </button>

    </div>
  );
}

export default AddBookForm;