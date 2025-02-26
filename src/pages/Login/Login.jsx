import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate để chuyển trang
import { login } from "../../services/authService"; // Import hàm login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    const userData = { email, password };
    const response = await login(userData);

    if (response.error) {
      setError(response.error);
    } else {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", JSON.stringify(response.token));

      alert("Login successful!");
      navigate("/");
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
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Hiển thị lỗi nếu có */}
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>
        <p className="mt-3">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
