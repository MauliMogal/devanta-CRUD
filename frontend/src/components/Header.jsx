import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px 20px",
      background: "#333",
    }}>
      <Link to="/home" >
        <img src="/logo.png" alt="Logo" style={{ height: "40px", cursor: "pointer" }} />
      </Link>
    </div>
  );
}

export default Header;
