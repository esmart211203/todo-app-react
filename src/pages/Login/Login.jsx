import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // Sử dụng React Router để chuyển trang

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful!");
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
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
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
