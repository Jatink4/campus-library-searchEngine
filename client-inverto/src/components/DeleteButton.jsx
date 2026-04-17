import { deleteBook } from "../services/api";

function DeleteButton({ id }) {

  const remove = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await deleteBook(id);
    alert("Deleted");
  };

  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
    transition: "all 0.3s ease"
  };

  return (
    <button
      onClick={remove}
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.08)";
        e.target.style.boxShadow = "0 5px 15px rgba(239,68,68,0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "none";
      }}
      onMouseDown={(e) => {
        e.target.style.transform = "scale(0.9)";
      }}
      onMouseUp={(e) => {
        e.target.style.transform = "scale(1.08)";
      }}
    >
      🗑 Delete
    </button>
  );
}

export default DeleteButton;