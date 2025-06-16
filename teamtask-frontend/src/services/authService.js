import axios from "axios"

const API_URL =  "http://localhost:3000/api/auth"

// Configuration axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Inscription
const register = async (userData) => {
  const response = await api.post("/register", userData)
  if (response.data.token) {
    localStorage.setItem("token", response.data.token)
  }
  return response.data
}

// Connexion
const login = async (userData) => {
  const response = await api.post("/login", userData)
  if (response.data.token) {
    localStorage.setItem("token", response.data.token)
  }
  return response.data
}

// Profil
const getProfile = async () => {
  const response = await api.get("/profile")
  return response.data
}

const authService = {
  register,
  login,
  getProfile,
}

export default authService
