"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../store/slices/userSlice"
import { getTasks } from "../store/slices/taskSlice"
import "./AdminPanel.css"

function AdminPanel() {
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state) => state.users)
  const { tasks } = useSelector((state) => state.tasks)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getTasks({}))
  }, [dispatch])

  const getUserStats = (userId) => {
    const userTasks = tasks.filter((task) => task.assignedTo._id === userId)
    return {
      total: userTasks.length,
      todo: userTasks.filter((task) => task.status === "à faire").length,
      inProgress: userTasks.filter((task) => task.status === "en cours").length,
      completed: userTasks.filter((task) => task.status === "terminée").length,
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="admin-panel">
        <div className="loading">Chargement des données...</div>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Panneau d'Administration</h2>
        <p>Gestion des utilisateurs et vue d'ensemble des tâches</p>
      </div>

      {/* Statistiques globales */}
      <div className="global-stats">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Utilisateurs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{users.filter((u) => u.role === "manager").length}</div>
          <div className="stat-label">Managers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.length}</div>
          <div className="stat-label">Tâches totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tasks.filter((t) => t.status === "terminée").length}</div>
          <div className="stat-label">Tâches terminées</div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="users-section">
        <h3>Utilisateurs ({users.length})</h3>

        {users.length === 0 ? (
          <div className="no-users">
            <p>Aucun utilisateur trouvé.</p>
          </div>
        ) : (
          <div className="users-grid">
            {users.map((user) => {
              const stats = getUserStats(user._id)
              return (
                <div key={user._id} className="user-card">
                  <div className="user-header">
                    <div className="user-info">
                      <h4 className="user-name">{user.name}</h4>
                      <p className="user-email">{user.email}</p>
                      <span className={`user-role ${user.role}`}>
                        {user.role === "manager" ? "Manager" : "Utilisateur"}
                      </span>
                    </div>
                  </div>

                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-number">{stats.total}</span>
                      <span className="stat-label">Total</span>
                    </div>
                    <div className="user-stat todo">
                      <span className="stat-number">{stats.todo}</span>
                      <span className="stat-label">À faire</span>
                    </div>
                    <div className="user-stat progress">
                      <span className="stat-number">{stats.inProgress}</span>
                      <span className="stat-label">En cours</span>
                    </div>
                    <div className="user-stat completed">
                      <span className="stat-number">{stats.completed}</span>
                      <span className="stat-label">Terminées</span>
                    </div>
                  </div>

                  <div className="user-meta">
                    <small>Inscrit le {formatDate(user.createdAt)}</small>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
