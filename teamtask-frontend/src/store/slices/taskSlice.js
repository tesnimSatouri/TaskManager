import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import taskService from "../../services/taskService"

// Actions asynchrones
export const getTasks = createAsyncThunk("tasks/getTasks", async (filters = {}, { rejectWithValue }) => {
  try {
    return await taskService.getTasks(filters)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la récupération des tâches"
    return rejectWithValue(message)
  }
})

export const createTask = createAsyncThunk("tasks/createTask", async (taskData, { rejectWithValue }) => {
  try {
    return await taskService.createTask(taskData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la création de la tâche"
    return rejectWithValue(message)
  }
})

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, taskData }, { rejectWithValue }) => {
  try {
    return await taskService.updateTask(id, taskData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la mise à jour de la tâche"
    return rejectWithValue(message)
  }
})

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, { rejectWithValue }) => {
  try {
    await taskService.deleteTask(id)
    return id
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Erreur lors de la suppression de la tâche"
    return rejectWithValue(message)
  }
})

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  totalTasks: 0,
  filters: {
    status: "",
    assignedTo: "",
  },
}

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearError: (state) => {
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload.tasks
        state.totalTasks = action.payload.tasks.length
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.unshift(action.payload.task)
        state.totalTasks += 1
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload.task._id)
        if (index !== -1) {
          state.tasks[index] = action.payload.task
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload)
        state.totalTasks -= 1
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, setFilters, clearError } = taskSlice.actions
export default taskSlice.reducer
