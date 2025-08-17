import axios from "axios";

const API_BASE_URL = "http://localhost:8000";


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "multipart/form-data"
  }
});


export async function findSimilarItems(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiClient.post("/find-similar", formData);
    return response.data;
  } catch (error) {
    console.error("Error finding similar items:", error);
    throw error;
  }
}