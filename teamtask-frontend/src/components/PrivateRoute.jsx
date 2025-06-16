import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateRoute({ children }) {
  const { token, isAuthenticated } = useSelector((state) => state.auth)

  return token && isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
