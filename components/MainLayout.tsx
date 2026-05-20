import { Fragment, type MouseEvent, type ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type ToolbarAction = {
  label: string;
  onClick?: () => void;
};

export type SidebarItem = {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  dividerBefore?: boolean;
  onClick?: () => void;
};

export type MainLayoutProps = {
  title: string;
  subtitle?: string;
  toolbarActions: ToolbarAction[];
  sidebarItems: SidebarItem[];
  drawerWidth?: number;
};

export default function MainLayout({
  title,
  subtitle,
  toolbarActions,
  sidebarItems,
  drawerWidth = 240,
}: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const primaryToolbarAction = toolbarActions[0];
  const overflowToolbarActions = toolbarActions.slice(1);

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open);
  };

  const handleActionsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setActionsAnchorEl(null);
  };

  const handleToolbarActionClick = (action: ToolbarAction) => {
    action.onClick?.();
    handleActionsClose();
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    item.onClick?.();
    setMobileOpen(false);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarItems.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              {item.dividerBefore ? <Divider component="li" /> : null}
              <ListItemButton
                selected={item.selected}
                onClick={() => handleSidebarItemClick(item)}
              >
                {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Fragment>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            aria-label="open navigation"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ minWidth: 0, textAlign: "left" }}>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                variant="caption"
                noWrap
                sx={{
                  display: { xs: "none", sm: "block" },
                  lineHeight: 1,
                  opacity: 0.8,
                }}
              >
                {subtitle}
              </Typography>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {primaryToolbarAction ? (
            <Button
              color="inherit"
              onClick={() => handleToolbarActionClick(primaryToolbarAction)}
            >
              {primaryToolbarAction.label}
            </Button>
          ) : null}
          {overflowToolbarActions.map((action) => (
            <Button
              key={action.label}
              color="inherit"
              onClick={() => handleToolbarActionClick(action)}
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              {action.label}
            </Button>
          ))}
          {overflowToolbarActions.length > 0 ? (
            <>
              <IconButton
                aria-label="open actions"
                aria-controls={actionsAnchorEl ? "toolbar-actions" : undefined}
                aria-haspopup="true"
                aria-expanded={actionsAnchorEl ? "true" : undefined}
                color="inherit"
                onClick={handleActionsOpen}
                sx={{ display: { sm: "none" } }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="toolbar-actions"
                anchorEl={actionsAnchorEl}
                open={Boolean(actionsAnchorEl)}
                onClose={handleActionsClose}
              >
                {overflowToolbarActions.map((action) => (
                  <MenuItem
                    key={action.label}
                    onClick={() => handleToolbarActionClick(action)}
                  >
                    {action.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : null}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
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
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
