import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#1976d2" }}>
      <Toolbar>
        <WorkIcon sx={{ mr: 2 }} />
        <Typography variant="h6" noWrap component="div">
          Employee Task Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
