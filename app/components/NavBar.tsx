import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const NavBar = () => {
  const { auth } = usePuterStore();
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-lg lg:text-2xl font-bold text-gradient">Resumetric</p>
      </Link>
      <div className="flex gap-2">
        <Link to="/upload" className="primary-button w-[150px] lg:w-fit text-nowrap">
          Upload Resume
        </Link>
        <button onClick={auth.signOut} className="primary-button w-fit">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
