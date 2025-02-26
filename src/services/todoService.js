import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; 

export const getTasksService = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách task:", error);
        return null; 
    }
};

export const addTaskService = async (taskData) => {
    try {
        console.log("Task data", taskData);
        
        const response = await axios.post(`${BASE_URL}/tasks`, taskData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm task:", error);
        return null; 
    }
};

export const deleteTaskService = async (taskId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`);
      return response.data; 
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
      return { error: error.message }; 
    }
};

export const updateStatusService = async (taskId, status) => {
    console.log("id task và status", taskId + status);
    
    try {
        const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, { status }); 
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật task:", error);
        return { error: error.response?.data?.message || "Lỗi không xác định" }; 
    }
};
