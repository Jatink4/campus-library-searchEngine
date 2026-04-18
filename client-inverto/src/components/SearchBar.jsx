import { useState } from "react";
import { searchBooks } from "../services/api";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (query.trim() === "") return;

    const res = await searchBooks(query);
    const data = await res.json();

    setResults(data.hits?.hits?.map(item => item._source) || []);
  };

  const inputStyle = {
    padding: "10px 14px",
    width: "260px",
    marginRight: "10px",
    border: "1px solid #334155",
    borderRadius: "10px",
    background: "#020617",
    color: "#e2e8f0",
    outline: "none",
    transition: "all 0.3s ease"
  };

  const buttonStyle = {
    padding: "10px 18px",
    background: "#38bdf8",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease"
  };

  const listItemStyle = {
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    background: "#1e293b",
    transition: "all 0.3s ease"
  };

  return (
    <div style={{ padding: "10px" }}>
      
      <br />
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Search by title, author, subject"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.border = "1px solid #38bdf8";
            e.target.style.boxShadow = "0 0 8px #38bdf8";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #334155";
            e.target.style.boxShadow = "none";
          }}
        />

        <button
          onClick={search}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 5px 15px rgba(56,189,248,0.4)";
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
          Search
        </button>
      </div>

      <ul style={{ marginTop: "10px", padding: "0", listStyle: "none" }}>
        {results.map((b, i) => (
          <li
            key={i}
            style={listItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(5px)";
              e.currentTarget.style.background = "#334155";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.background = "#1e293b";
            }}
          >
            <b style={{ color: "#e2e8f0" }}>{b.title}</b>
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>
              {b.authors.join(", ")}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default SearchBar;