"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout, getProfile } from "../store/slices/authSlice"
import { getTasks, setFilters } from "../store/slices/taskSlice"
import { getAllUsers } from "../store/slices/userSlice"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import AdminPanel from "./AdminPanel"
import Spinner from "./Spinner"
import "./Dashboard.css"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, token, isAuthenticated } = useSelector((state) => state.auth)
  const { tasks, isLoading, filters, totalTasks } = useSelector((state) => state.tasks)
  const { users } = useSelector((state) => state.users)

  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [activeTab, setActiveTab] = useState("tasks")

  useEffect(() => {
    if (!token || !isAuthenticated) {
      navigate("/login")
      return
    }

    if (!user) {
      dispatch(getProfile())
    }

    // Charger les tâches
    dispatch(getTasks(filters))

    // Charger les utilisateurs si manager
    if (user?.role === "manager") {
      dispatch(getAllUsers())
    }
  }, [token, isAuthenticated, user, navigate, dispatch, filters])

  const onLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    dispatch(setFilters(newFilters))
    dispatch(getTasks(newFilters))
  }

  const getTaskStats = () => {
    const stats = {
      total: totalTasks,
      todo: tasks.filter((task) => task.status === "à faire").length,
      inProgress: tasks.filter((task) => task.status === "en cours").length,
      completed: tasks.filter((task) => task.status === "terminée").length,
    }
    return stats
  }

  const stats = getTaskStats()

  if (isLoading && !user) {
    return <Spinner />
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>TeamTask</h1>
            <span className="header-subtitle">Gestion des tâches collaborative</span>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">{user?.role === "manager" ? "Manager" : "Utilisateur"}</span>
              </div>
              <button onClick={onLogout} className="btn btn-secondary btn-sm">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <button className={`nav-btn ${activeTab === "tasks" ? "active" : ""}`} onClick={() => setActiveTab("tasks")}>
            Mes Tâches
          </button>
          {user?.role === "manager" && (
            <button
              className={`nav-btn ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              Administration
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === "tasks" && (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-card todo">
                <div className="stat-number">{stats.todo}</div>
                <div className="stat-label">À faire</div>
              </div>
              <div className="stat-card progress">
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">En cours</div>
              </div>
              <div className="stat-card completed">
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Terminées</div>
              </div>
            </div>

            {/* Controls */}
            <div className="dashboard-controls">
              <div className="controls-left">
                <div className="filter-group">
                  <label htmlFor="statusFilter">Filtrer par statut:</label>
                  <select
                    id="statusFilter"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="form-control"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="à faire">À faire</option>
                    <option value="en cours">En cours</option>
                    <option value="terminée">Terminée</option>
                  </select>
                </div>
              </div>

              <div className="controls-right">
                {user?.role === "manager" && (
                  <button onClick={() => setShowTaskForm(true)} className="btn btn-primary">
                    + Créer une tâche
                  </button>
                )}
              </div>
            </div>

            {/* Tasks Section */}
            <div className="tasks-section">
              <div className="section-header">
                <h2>
                  {user?.role === "manager" ? "Toutes les tâches" : "Mes tâches"}
                  <span className="task-count">({tasks.length})</span>
                </h2>
              </div>

              <TaskList tasks={tasks} userRole={user?.role} userId={user?.id} users={users} />
            </div>
          </>
        )}

        {activeTab === "admin" && user?.role === "manager" && <AdminPanel users={users} />}

        {/* Task Form Modal */}
        {showTaskForm && <TaskForm onCancel={() => setShowTaskForm(false)} users={users} currentUser={user} />}
      </main>
    </div>
  )
}

export default Dashboard
