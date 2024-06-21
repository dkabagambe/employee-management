import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data; // Assuming response.data contains the token
  } catch (error) {
    throw new Error("Login failed. Please try again."); // Custom error message for login failure
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors on pending
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Display the error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
