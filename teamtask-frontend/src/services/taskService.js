import axios from "axios"

const API_URL =  "http://localhost:3000/api/tasks"

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

// Récupérer les tâches avec filtres
const getTasks = async (filters = {}) => {
  const params = new URLSearchParams()

  if (filters.status) {
    params.append("status", filters.status)
  }

  const response = await api.get(`/?${params.toString()}`)
  return response.data
}

// Créer une tâche
const createTask = async (taskData) => {
  const response = await api.post("/", taskData)
  return response.data
}

// Mettre à jour une tâche
const updateTask = async (id, taskData) => {
  const response = await api.put(`/${id}`, taskData)
  return response.data
}

// Supprimer une tâche
const deleteTask = async (id) => {
  const response = await api.delete(`/${id}`)
  return response.data
}

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}

export default taskService
