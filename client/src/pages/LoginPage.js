import React from "react";
import LoginPageComponent from "../components/LoginPage";
import { Box, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  return (
    <Box sx={{ padding: 3, Width: 100, margin: "auto", marginTop: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ marginBottom: 3 }}
      >
        Login
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <LoginPageComponent />
      </Paper>
    </Box>
  );
};

export default LoginPage;
