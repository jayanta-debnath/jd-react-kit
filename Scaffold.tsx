import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { ReactNode } from "react";

const drawerWidth = 240;

type DrawerItems = {
  icon: ReactNode;
  text: string;
};

export function Scaffold(params: {
  appName: string;
  title?: string;
  subtitle?: string;
  action?: string;
  drawerItems?: DrawerItems[];
  body?: ReactNode;
}) {
  const drawerItems = params.drawerItems ?? [];

  return (
    <Box sx={{ display: "flex", minHeight: "100svh", bgcolor: "grey.50" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open navigation"
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: "left" }}>
            <Typography variant="h6" noWrap>
              {params.title ?? params.appName}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.8 }} noWrap>
              {params.subtitle}
            </Typography>
          </Box>

          {params.action && (
            <Button
              color="inherit"
              variant="outlined"
              sx={{ borderColor: "currentcolor" }}
            >
              {params.action}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {drawerItems.length > 0 && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Toolbar sx={{ gap: 1.5 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                {params.appName.substring(0, 1)}
              </Avatar>
              <Typography variant="h6" noWrap>
                {params.appName}
              </Typography>
            </Toolbar>

            <Divider />

            <List sx={{ px: 1, py: 2 }}>
              {drawerItems.map((item) => (
                <ListItemButton key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar />
        {params.body}
      </Box>
    </Box>
  );
}
