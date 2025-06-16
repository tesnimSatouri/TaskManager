"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTask, updateTask } from "../store/slices/taskSlice"
import "./TaskForm.css"

function TaskForm({ onCancel, task = null, users = [], currentUser }) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "à faire",
    assignedTo: task?.assignedTo?._id || currentUser?.id || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { title, description, status, assignedTo } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
        ...(currentUser?.role === "manager" && assignedTo && { assignedTo }),
      }

      if (task) {
        // Mise à jour
        await dispatch(updateTask({ id: task._id, taskData })).unwrap()
      } else {
        // Création
        await dispatch(createTask(taskData)).unwrap()
      }

      onCancel()
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Modifier la tâche" : "Créer une nouvelle tâche"}</h2>
          <button onClick={onCancel} className="close-btn" type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Entrez le titre de la tâche"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Décrivez la tâche (optionnel)"
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Statut</label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={onChange}
              disabled={isSubmitting}
            >
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
          </div>

          {/* Assignation (seulement pour les managers) */}
          {currentUser?.role === "manager" && users.length > 0 && (
            <div className="form-group">
              <label htmlFor="assignedTo">Assigner à</label>
              <select
                className="form-control"
                id="assignedTo"
                name="assignedTo"
                value={assignedTo}
                onChange={onChange}
                disabled={isSubmitting}
              >
                <option value="">Sélectionner un utilisateur</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email}) - {user.role}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary" disabled={isSubmitting}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
              {isSubmitting ? "Enregistrement..." : task ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
