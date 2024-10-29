import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      <div className="flex items-center justify-between py-2.5 sm:py-2 font-medium border-b">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-12" />
          </Link>
        </div>

        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
