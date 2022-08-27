import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
    <Tooltip title="Login" placement="bottom">
      <RouterLink to="/login">
        <Fab color="error" style={style} aria-label="login">
          <PersonIcon fontSize="large" />
        </Fab>
      </RouterLink>
    </Tooltip>
  );
};

const AuthenticatedUserArea = _props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <Fab color="error" style={style} aria-label="settings" onClick={handleClick}>
        <AdminPanelSettingsIcon fontSize="large" />
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const UserArea = props => {
  if (!props.user) {
    return <UnauthenticatedUserArea />;
  } else {
    return <AuthenticatedUserArea />;
  };
};

export default UserArea;
