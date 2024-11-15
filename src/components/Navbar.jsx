import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProjectContext } from "../context/ProjectsContext";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { activeProject, deleteProject } = useProjectContext();
  const { supabase, session } = useUserContext();

  function handleCancelCreate(e) {
    e.preventDefault();
    let check = confirm("Do you want to discard this project?");

    if (check) navigate("/");
  }

  async function handleDeleteProject(e) {
    e.preventDefault();
    const id = pathname.split("/")[2];
    console.log(id);

    if (!confirm("Do you want to permanently delete this project?")) return;

    const response = deleteProject();

    navigate("/");
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error);
    }
  }

  return (
    <header className="sticky top-0 flex gap-2 bg-brand-300 p-4 font-brand text-2xl text-inverse">
      {pathname === "/" && (
        <h1 className="grow font-brand text-4xl font-black">Knitr</h1>
      )}
      {session && pathname === "/" && (
        <>
          <Link to={"/create"} className="flex items-center">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <button onClick={handleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </>
      )}
      {session && pathname === "/create" && (
        <button
          onClick={handleCancelCreate}
          className="flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="text-xl">Home</span>
        </button>
      )}
      {session && pathname.split("/")[1] === "project" && (
        <div className="flex grow">
          <Link className="flex grow items-center gap-1" to={"/"}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="text-xl">Home</span>
          </Link>
          <button onClick={handleDeleteProject}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
