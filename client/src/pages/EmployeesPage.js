import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import { Box, Typography, Paper, Grid } from "@mui/material";

const EmployeesPage = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Employees
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ margin: "auto" }}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <EmployeeForm employee={editingEmployee} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <EmployeeList onEdit={handleEdit} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeesPage;
