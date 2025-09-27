import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/apiSlice.jsx";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    lastUpdated: null,
  },
  reducers: {
     clearError: (state) => {
      state.error = null;
    },
    
     clearTasks: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.lastUpdated = null;
    },
    
     toggleTaskStatus: (state, action) => {
      const taskId = action.payload;
      const task = state.items.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
       .addCase(addTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload); 
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // update task
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // delete task
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((t) => t.id !== action.payload);
        state.error = null;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearError, clearTasks, toggleTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;