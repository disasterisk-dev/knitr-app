import { useProjectContext } from "../context/ProjectsContext";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import GetStarted from "../components/GetStarted";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { projects, setProjects, fetchProjectsAll } = useProjectContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjectsAll().then((p) => {
      setProjects(p);
      setIsLoading(false);
    });
  }, [fetchProjectsAll, setProjects]);

  return (
    <>
      <section className="flex h-full grow flex-col items-stretch gap-4">
        {projects.length == 0 && !isLoading && <GetStarted />}
        {isLoading && <LoadingSpinner />}
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
