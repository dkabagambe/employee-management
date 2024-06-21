import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  deleteEmployee,
} from "../features/employees/employeeSlice";
import { CSVLink } from "react-csv";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const EmployeeList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Department", key: "department" },
  ];

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(employee)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 2, textAlign: "right" }}>
        <CSVLink
          data={employees}
          headers={headers}
          filename={"employees.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="primary">
            Export to CSV
          </Button>
        </CSVLink>
      </Box>
    </Box>
  );
};

export default EmployeeList;
