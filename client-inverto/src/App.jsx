import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import FrontMain from "./pages/Frontmain";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [logged, setLogged] = useState(
    localStorage.getItem("admin") === "true"
  );

  return (
    <Router>
      <Routes>
        {/* Front page */}
        <Route path="/" element={<FrontMain />} />

        {/* Admin login */}
        <Route path="/admin" element={<AdminLogin setLogged={setLogged} />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            logged ? <AdminDashboard /> : <Navigate to="/admin" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;