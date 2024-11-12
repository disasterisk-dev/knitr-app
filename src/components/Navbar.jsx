import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProjectContext } from "../context/ProjectsContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {deleteProject} = useProjectContext();

  function handleCancelCreate(e) {
    e.preventDefault();
    let check = confirm("Do you want to discard this project?");

    if (check) navigate("/");
  }

  function handleDeleteProject(e) {
    e.preventDefault();
    const id = pathname.split("/")[2];
    console.log(id)
    
    if(!confirm("Do you want to permanently delete this project?")) return
    
    deleteProject(id);
    navigate("/")
  }

  return (
    <header className="sticky top-0 flex bg-brand-300 px-8 py-4 text-inverse">
      <h1 className="grow font-brand text-4xl font-black">Knitr</h1>
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
        {pathname.split("/")[1] === "project" && (
          <button onClick={handleDeleteProject}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
