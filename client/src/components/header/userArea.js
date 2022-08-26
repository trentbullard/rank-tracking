import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import PersonIcon from "@mui/icons-material/Person";

const style = {
  margin: 0,
  top: 20,
  right: 20,
  bottom: "auto",
  left: "auto",
  position: "fixed",
  ariaLabel: "login",
}

const UnauthenticatedUserArea = props => {
  return (
    <Tooltip title="Login" placement="bottom">
      <Fab color="error" aria-label="login" style={style} onClick={props.onClick}>
        <PersonIcon fontSize="large" />
      </Fab>
    </Tooltip>
  );
};

const AuthenticatedUserArea = props => {
  return null;
};

const UserArea = props => {
  if (!props.user) {
    return <UnauthenticatedUserArea onClick={props.onClick} />;
  } else {
    return <AuthenticatedUserArea />;
  };
};

export default UserArea;
