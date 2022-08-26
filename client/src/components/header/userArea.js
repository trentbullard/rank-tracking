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
  ariaLabel: "login"
}

const UserArea = props => {
  return (
    <Tooltip title="login" placement="bottom">
      <Fab style={style} color="error">
        <PersonIcon fontSize="large" />
      </Fab>
    </Tooltip>
  );
};

export default UserArea;
