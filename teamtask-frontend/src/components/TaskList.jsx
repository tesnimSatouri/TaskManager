"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTask, deleteTask } from "../store/slices/taskSlice"
import TaskForm from "./TaskForm"
import "./TaskList.css"

function TaskList({ tasks, userRole, userId, users = [] }) {
  const dispatch = useDispatch()
  const [editingTask, setEditingTask] = useState(null)

  const getStatusClass = (status) => {
    switch (status) {
      case "à faire":
        return "status-todo"
      case "en cours":
        return "status-progress"
      case "terminée":
        return "status-done"
      default:
        return ""
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await dispatch(
        updateTask({
          id: taskId,
          taskData: { status: newStatus },
        }),
      ).unwrap()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await dispatch(deleteTask(taskId)).unwrap()
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const canEditTask = (task) => {
    return userRole === "manager" || task.assignedTo._id === userId
  }

  const canDeleteTask = (task) => {
    return userRole === "manager" || task.createdBy._id === userId
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <div className="no-tasks-icon">📝</div>
        <h3>Aucune tâche trouvée</h3>
        <p>
          {userRole === "manager"
            ? "Créez votre première tâche pour commencer !"
            : "Aucune tâche ne vous est assignée pour le moment."}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-status-container">
                <select
                  className={`task-status-select ${getStatusClass(task.status)}`}
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  disabled={!canEditTask(task)}
                >
                  <option value="à faire">À faire</option>
                  <option value="en cours">En cours</option>
                  <option value="terminée">Terminée</option>
                </select>
              </div>
            </div>

            {task.description && (
              <div className="task-description">
                <p>{task.description}</p>
              </div>
            )}

            <div className="task-meta">
              <div className="meta-item">
                <span className="meta-label">Assigné à:</span>
                <span className="meta-value">{task.assignedTo.name}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Créé par:</span>
                <span className="meta-value">{task.createdBy.name}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Créé le:</span>
                <span className="meta-value">{formatDate(task.createdAt)}</span>
              </div>
            </div>

            <div className="task-actions">
              {canEditTask(task) && (
                <button onClick={() => setEditingTask(task)} className="btn btn-sm btn-outline">
                  Modifier
                </button>
              )}
              {canDeleteTask(task) && (
                <button onClick={() => handleDeleteTask(task._id)} className="btn btn-sm btn-danger">
                  Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <TaskForm
          task={editingTask}
          onCancel={() => setEditingTask(null)}
          users={users}
          currentUser={{ id: userId, role: userRole }}
        />
      )}
    </>
  )
}

export default TaskList
