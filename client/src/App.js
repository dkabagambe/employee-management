import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeesPage from "./pages/EmployeesPage";
import { CssBaseline, Container, Typography, Box } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Employee Management System
          </Typography>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </Box>
      </Container>
    </>
  );
};

export default App;
