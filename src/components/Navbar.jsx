import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleCancelCreate(e) {
    e.preventDefault();
    let check = confirm("Do you want to discard this project?");

    if (check) navigate("/");
  }

  return (
    <header className="sticky top-0 flex bg-brand-300 px-8 py-4 text-inverse">
      <Link to={"/"} className="grow">
        <h1 className="font-brand text-4xl font-black">Knitr</h1>
      </Link>
      <nav className="flex items-center justify-center text-3xl">
        {pathname === "/" && (
          <Link to={"/create"}>
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        )}
        {pathname === "/create" && (
          <button onClick={handleCancelCreate}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
