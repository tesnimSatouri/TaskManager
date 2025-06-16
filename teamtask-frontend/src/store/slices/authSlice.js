import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../services/authService"

// Actions asynchrones
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await authService.register(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de l'inscription"
    return rejectWithValue(message)
  }
})

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la connexion"
    return rejectWithValue(message)
  }
})

export const getProfile = createAsyncThunk("auth/getProfile", async (_, { rejectWithValue }) => {
  try {
    return await authService.getProfile()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la récupération du profil"
    return rejectWithValue(message)
  }
})

// État initial avec récupération du token depuis localStorage
const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  isAuthenticated: !!localStorage.getItem("token"),
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    logout: (state) => {
      localStorage.removeItem("token")
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    clearError: (state) => {
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.isAuthenticated = false
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.isAuthenticated = false
      })
      // Get Profile
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(getProfile.rejected, (state) => {
        state.isAuthenticated = false
        state.token = null
        localStorage.removeItem("token")
      })
  },
})

export const { reset, logout, clearError } = authSlice.actions
export default authSlice.reducer
