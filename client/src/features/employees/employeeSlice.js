import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axiosInstance.get("/employees");
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const response = await axiosInstance.post("/employees", employee);
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }) => {
    const response = await axiosInstance.put(`/employees/${id}`, employee);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axiosInstance.delete(`/employees/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        state.employees[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
