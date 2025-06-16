"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { login, reset, clearError } from "../store/slices/authSlice"
import Spinner from "./Spinner"
import "./Auth.css"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

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
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(clearError())

    if (!email || !password) {
      return
    }

    const userData = { email, password }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <h1>TeamTask</h1>
          <h2>Connexion</h2>
          <p>Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={onSubmit} className="form">
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
              placeholder="Entrez votre mot de passe"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        {isError && (
          <div className="alert alert-error">
            <p>{message}</p>
          </div>
        )}

        <div className="auth-footer">
          <p>
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
