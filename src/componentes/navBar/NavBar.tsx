import "./NavBar.css";
import logo from "../../static/logo.png";

function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <img src={logo} alt="SaltZapp" />
    </div>
  );
}

export default NavBar;
