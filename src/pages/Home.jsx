import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";
import { useProjectContext } from "../context/ProjectsContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { useUserContext } from "../context/UserContext";
import GetStarted from "../components/GetStarted";

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
    });
  }, []);

  return (
    <>
      <section className="flex h-full grow flex-col items-stretch gap-4">
        {projects.length == 0 && <GetStarted />}
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
