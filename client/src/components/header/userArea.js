import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../contexts/AuthContext';

const style = {
  margin: 0,
  top: "1em",
  right: "1em",
  bottom: "auto",
  left: "auto",
  position: "fixed",
  ariaLabel: "login",
}

const UnauthenticatedUserArea = () => {
  return (
    <RouterLink to="/login" replace>
      <Tooltip title="Login">
        <Fab color="secondary" style={style} aria-label="login">
          <PersonIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </RouterLink>
  );
};

const AuthenticatedUserArea = _props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("./login", { replace: true });
  };
  
  return (
    <>
      <Tooltip title="Settings">
        <Fab color="secondary" style={style} aria-label="settings" onClick={handleClick}>
          <AdminPanelSettingsIcon fontSize="large" />
        </Fab>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const UserArea = () => {
  const { currentUser } = React.useContext(AuthContext);
  if (currentUser) {
    return <AuthenticatedUserArea />;
  } else {
    return <UnauthenticatedUserArea />;
  };
};

export default UserArea;
