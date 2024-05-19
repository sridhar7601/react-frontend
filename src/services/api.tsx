import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data: any) => api.post("/auth/register", data);
export const login = (data: any) => api.post("/auth/login", data);
export const fetchProperties = () => api.get("/properties");
export const fetchMyProperties = (userId: string) =>
  api.get(`/properties/my-properties/${userId}`);
export const addProperty = (data: any) => api.post("/properties", data);
export const deleteProperty = (propertyId: string) =>
  api.delete(`/properties/${propertyId}`);
export const updateProperty = (id: string, data: any) =>
  api.put(`/properties/${id}`, data);
export const updateLikeCount = async (propertyId, increment, token) => {
  const response = await axios.post(`${API_URL}/properties/${propertyId}/like`, { increment }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export default api;
