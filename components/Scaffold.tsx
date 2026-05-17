import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
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
import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

type DrawerItems = {
  icon: ReactNode;
  text: string;
  page?: string;
};

export function Scaffold(params: {
  appname: string;
  title?: string;
  subtitle?: string;
  action?: string;
  drawerItems?: DrawerItems[];
  body?: ReactNode;
}) {
  const drawerItems = params.drawerItems ?? [];
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setMobileOpen(false);
    navigate("/");
  };

  const handleDrawerItemClick = (item: DrawerItems) => {
    setMobileOpen(false);

    if (item.page) {
      navigate(item.page);
    }
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar
        component={ButtonBase}
        onClick={handleHomeClick}
        sx={{
          gap: 1.5,
          width: "100%",
          justifyContent: "flex-start",
          color: "inherit",
        }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
          {params.appname.substring(0, 1)}
        </Avatar>
        <Typography variant="h6" noWrap>
          {params.appname}
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        {drawerItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => handleDrawerItemClick(item)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

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
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, minWidth: 0, textAlign: "left" }}>
            <Typography variant="h6" noWrap>
              {params.title ?? params.appname}
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

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: 0 }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar />
        {params.body}
      </Box>
    </Box>
  );
}
