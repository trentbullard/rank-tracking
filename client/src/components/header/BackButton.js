import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const style = {
  margin: 0,
  top: ".5rem",
  right: "auto",
  bottom: "auto",
  left: ".5rem",
  position: "fixed",
  ariaLabel: "login",
  fontSize: "2rem",
};

const BackButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    pathname === "/" || pathname === "/login" ? null :
      <ArrowBackIcon color="secondary" style={style} onClick={() => navigate(-1)} />
  );
};

export default BackButton;
