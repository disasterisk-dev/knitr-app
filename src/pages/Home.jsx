import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";
import { useProjectContext } from "../context/ProjectsContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const { projects, setProjects } = useProjectContext();
  const { supabase, session } = useUserContext();

  async function getProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("owner", session.user.id);

    if (error) return error;

    return data;
  }

  useEffect(() => {
    getProjects().then((p) => {
      setProjects(p);
      if (projects.length == 0) {
        setProjects(null);
      }
    });
  }, []);

  return (
    <>
      <section className="flex h-full grow flex-col items-stretch justify-center gap-4">
        {!projects && (
          <>
            <FontAwesomeIcon
              icon={faMitten}
              className="animate-wiggle text-5xl text-brand-300"
            />
            <h2 className="text-center font-brand text-3xl font-semibold text-subtle">
              Welcome to Knitr!
            </h2>
            <Link
              className="text-center text-brand-400 underline"
              to={"/create"}
            >
              Get started
            </Link>
          </>
        )}
        {projects && (
          <>
            {projects.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
