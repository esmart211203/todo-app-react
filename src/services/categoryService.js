import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; 

export const getCategoryService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
        return null; 
    }
};

export const addCategoryService = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/categories`, {name});
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm task:", error);
        return null; 
    }
};