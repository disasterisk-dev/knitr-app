import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  const { deleteProject } = useProjectContext();
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

    const response = await supabase.from("projects").delete().eq("id", id);

    navigate("/");
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error);
    }
  }

  return (
    <header className="sticky top-0 flex bg-brand-300 px-8 py-4 text-inverse">
      <h1 className="grow font-brand text-4xl font-black">Knitr</h1>
      {session && (
        <nav className="flex items-center justify-center gap-4 text-3xl">
          {pathname === "/" && (
            <>
              <Link to={"/create"}>
                <FontAwesomeIcon icon={faPlus} />
              </Link>
              <button onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </>
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
      )}
    </header>
  );
};

export default Navbar;
