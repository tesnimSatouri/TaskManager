"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { register, reset, clearError } from "../store/slices/authSlice"
import Spinner from "./Spinner"
import "./Auth.css"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [passwordError, setPasswordError] = useState("")

  const { name, email, password, confirmPassword, role } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard")
    }

    if (isSuccess && user) {
      navigate("/dashboard")
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isAuthenticated, isSuccess, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    // Clear password error when user types
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())
    setPasswordError("")

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return
    }

    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas")
      return
    }

    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    const userData = { name, email, password, role }
    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>TeamTask</h1>
          <h2>Inscription</h2>
          <p>Créez votre compte</p>
        </div>

        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Entrez votre nom complet"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Entrez votre email"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Entrez votre mot de passe (min. 6 caractères)"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirmez votre mot de passe"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rôle</label>
            <select className="form-control" id="role" name="role" value={role} onChange={onChange}>
              <option value="user">Utilisateur</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
          </div>
        </form>

        {(isError || passwordError) && (
          <div className="alert alert-error">
            <p>{passwordError || message}</p>
          </div>
        )}

        <div className="auth-footer">
          <p>
            Déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
