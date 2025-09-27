import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// supabase config
const supabaseUrl = "https://kbybdtacoqvgcijrkzkv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE";

// axios
const apiClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    'Authorization': `Bearer ${supabaseAnonKey}`,
    'apikey': supabaseAnonKey,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
});

// get all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await apiClient.get('/tasks?order=created_at.desc');
    return response.data;
  } catch (error) {
    console.error("error fetching tasks:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

// add task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await apiClient.post('/tasks', task);
    return response.data[0];
  } catch (error) {
    console.error("error adding task:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

// update task
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, updates }) => {
  try {
    const response = await apiClient.patch(`/tasks?id=eq.${id}`, updates);
    return response.data[0];
  } catch (error) {
    console.error("error updating task:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

// delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    await apiClient.delete(`/tasks?id=eq.${id}`);
    return id;
  } catch (error) {
    console.error("error deleting task:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

// get categories
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async ({ limit, offset } = {}) => {
  try {
    let url = '/categories?order=name.asc';
    
    if (limit) {
      url += `&limit=${limit}`;
    }
    if (offset) {
      url += `&offset=${offset}`;
    }
    
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("error fetching categories:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});

// get single category
export const fetchCategoryById = createAsyncThunk("categories/fetchCategoryById", async (id) => {
  try {
    const response = await apiClient.get(`/categories?id=eq.${id}`);
    return response.data[0];
  } catch (error) {
    console.error("error fetching category:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
});