import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const NavBar = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">Resume Analyzer</p>
      </Link>
      <div>
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        <button onClick={auth.signOut} className="primary-button w-fit">
          logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
