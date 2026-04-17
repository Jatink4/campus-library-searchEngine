import { useState } from "react";
import { loginAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminLogin({ setLogged }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await loginAdmin(password);
    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("admin", "true");
      setLogged(true);
      navigate("/dashboard");
    } else {
      alert("Wrong password");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#e2e8f0",
    marginBottom: "15px",
    outline: "none",
    transition: "all 0.3s ease"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#38bdf8",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a"
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#38bdf8" }}>
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={login}
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
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;