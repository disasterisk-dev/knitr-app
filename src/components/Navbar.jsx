import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faPlus,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { v4 as uuid } from "uuid";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { supabase, session } = useUserContext();

  async function handleCancelCreate(e) {
    e.preventDefault();
    let check = confirm("Do you want to discard this project?");

    const id = pathname.split("/")[2];
    const { data, error } = await supabase.storage
      .from("thumbnails")
      .remove([session.user.id + "/" + id]);

    if (error) {
      console.log(error);
    }

    if (check) navigate("/");
  }

  async function handleDeleteProject(e) {
    e.preventDefault();
    const id = pathname.split("/")[2];

    if (!confirm("Do you want to permanently delete this project?")) return;

    const { data, error } = await supabase.storage
      .from("thumbnails")
      .remove([session.user.id + "/" + id]);

    if (error) {
      console.log(error);
    }

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
    <header className="sticky top-0 z-50 flex w-full gap-2 bg-brand-300 p-4 font-brand text-2xl text-inverse">
      {pathname === "/" && (
        <h1 className="grow font-brand text-4xl font-black">Knitr</h1>
      )}
      {session && pathname === "/" && (
        <>
          <Link to={"/create/" + uuid()} className="flex items-center">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <button onClick={handleSignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </>
      )}
      {session && pathname.split("/")[1] === "create" && (
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
      {session && pathname.split("/")[1] === "draw" && (
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
