import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1e272e",
          color: "#fff",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
