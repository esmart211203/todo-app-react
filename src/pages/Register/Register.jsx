import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link , Navigate} from "react-router-dom";
import { register } from "../../services/authService.js";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setMessage("⚠️ Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("⚠️ Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }

    const response = await register({ username, email, password });

    if (response.userId) {
      setMessage("✅ Đăng ký thành công!");
      Navigate('/login');
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setMessage(response.error || "❌ Đăng ký thất bại!");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div
        className="p-4 shadow rounded text-white"
        style={{ width: "400px", background: "#333" }}
      >
        <h2 className="text-center">Đăng ký</h2>
        {message && (
          <p
            className={`mt-2 text-center ${
              message.includes("✅") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập:</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control bg-secondary text-white border-0"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-secondary text-white border-0"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Xác nhận mật khẩu:</label>
            <input
              type="password"
              className="form-control bg-secondary text-white border-0"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
