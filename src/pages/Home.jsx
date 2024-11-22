import { useProjectContext } from "../context/ProjectsContext";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import GetStarted from "../components/GetStarted";

const Home = () => {
  const { projects, setProjects, fetchProjectsAll } = useProjectContext();

  useEffect(() => {
    fetchProjectsAll().then((p) => {
      setProjects(p);
    });
  }, [fetchProjectsAll, setProjects]);

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
