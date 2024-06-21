import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  updateEmployee,
} from "../features/employees/employeeSlice";
import { TextField, Button, Box } from "@mui/material";

const EmployeeForm = ({ employee }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, employee: formData }));
    } else {
      dispatch(addEmployee(formData));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <TextField
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        {employee ? "Update" : "Add"}
      </Button>
    </Box>
  );
};

export default EmployeeForm;
