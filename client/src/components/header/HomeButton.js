import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

const style = {
  margin: 0,
  top: ".5rem",
  right: "auto",
  bottom: "auto",
  left: "3.5rem",
  position: "fixed",
  ariaLabel: "login",
  fontSize: "2rem",
  cursor: "pointer",
};

const HomeButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    pathname === "/" || pathname === "/login" ? null :
      <HomeIcon color="secondary" style={style} onClick={() => navigate("/")} />
  );
};

export default HomeButton;
