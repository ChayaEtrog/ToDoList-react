import axios from 'axios';

// הגדרת כתובת ה-API כ-default
axios.defaults.baseURL = process.env.REACT_APP_API_URL ;

// הוספת interceptor לתפוס שגיאות ב-response
axios.interceptors.response.use(
  response => response, // אם אין שגיאה, פשוט מחזירים את התגובה
  error => {
    console.error('Error in response:', error); // רשום את השגיאה בלוג
    return Promise.reject(error); // מחזירים את השגיאה
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get("/tasks");
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
    try {
      const result = await axios.post("/tasks", { name });
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  setCompleted: async (id, name, isComplete) => {
    console.log('setCompleted', { id, name, isComplete });
    try {
      const result = await axios.put(`/tasks/${id}`, {name, isComplete });
      return { ...result.data, name }; // שומר את שם המשימה
    } catch (error) {
      console.error("Error updating task completion status:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      const result = await axios.delete(`/tasks/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
};