import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; 

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    
    return { error: error.response?.data?.message || "Lỗi kết nối" };
  }
};


export const login = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Lưu token
    }

    return response.data;
  } catch (error) {
    console.log("erorr", error);
    
    return { error: error.response?.data?.message || "Đăng nhập thất bại" };
  }
};

// Hàm lấy token từ localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Hàm đăng xuất
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
