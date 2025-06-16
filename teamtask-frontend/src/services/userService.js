


import axios from "axios"



const API_URL =  "http://localhost:3000/api/users"

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

// Récupérer tous les utilisateurs (pour les managers)
const getAllUsers = async () => {
  try {
    const response = await api.get("/")
    return response.data
  } catch (error) {
    // Si la route n'existe pas (404), retourner une liste vide
    if (error.response?.status === 404) {
      console.warn("Route /api/users non implémentée sur le backend")
      return { users: [] }
    }
    throw error
  }
}

const userService = {
  getAllUsers,
}

export default userService
