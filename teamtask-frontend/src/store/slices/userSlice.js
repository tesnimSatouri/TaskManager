import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../../services/userService.js"

// Actions asynchrones
export const getAllUsers = createAsyncThunk("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    return await userService.getAllUsers()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la récupération des utilisateurs"
    return rejectWithValue(message)
  }
})

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: "",
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
