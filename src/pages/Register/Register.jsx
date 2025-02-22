import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && email && password) {
      alert("Registration successful!");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#555555" }}
    >
      <div
        className="p-4 shadow"
        style={{
          width: "400px",
          background: "#333333",
          color: "#fff",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                background: "#222",
                color: "#fff",
                border: "1px solid #666",
              }}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: "#222",
                color: "#fff",
                border: "1px solid #666",
              }}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: "#222",
                color: "#fff",
                border: "1px solid #666",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#007bff", color: "white" }}
          >
            Register
          </button>
        </form>
        <p className="mt-3">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
