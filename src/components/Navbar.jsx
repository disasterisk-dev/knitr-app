import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex px-8 py-4 bg-brand-300 text-inverse">
      <Link to={"/"} className="grow">
        <h1 className="font-brand text-4xl font-black">Knitr</h1>
      </Link>
      <nav className="flex justify-center items-center text-3xl">
        <Link to={"/create"}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
