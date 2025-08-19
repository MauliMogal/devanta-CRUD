import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="add">Login</button>
      </form>
    </div>
  );
}

export default Login;
