import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { TextField, Button, CircularProgress, Box } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        gap: 2, // gap between items
        Width: "auto", // maximum width of the form
        margin: "auto", // center the form horizontally
        marginTop: 2, // margin from the top
      }}
    >
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        type="submit"
        disabled={loading}
        variant="contained"
        color="primary"
        sx={{ alignSelf: "flex-start" }}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
      {error && <Box sx={{ color: "error.main" }}>{error}</Box>}
    </Box>
  );
};

export default LoginPage;
