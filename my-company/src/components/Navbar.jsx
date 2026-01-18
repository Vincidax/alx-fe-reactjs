import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "space-around",
        padding: "1rem",
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
        About
      </Link>
      <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
        Dashboard
      </Link>
      <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
        Profile
      </Link>
    </nav>
  );
}
