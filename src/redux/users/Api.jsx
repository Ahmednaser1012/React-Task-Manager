import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      avatar: "",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      avatar: "",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "inactive",
      avatar: "",
    },
    {
      id: "4",
      name: "Alice Williams",
      email: "alice@example.com",
      role: "User",
      status: "active",
      avatar: "",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "User",
      status: "inactive",
      avatar: "",
    },
    {
      id: "6",
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Admin",
      status: "active",
      avatar: "",
    },
  ];
});
