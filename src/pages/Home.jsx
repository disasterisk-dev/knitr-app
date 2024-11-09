import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";
import { useProjectContext } from "../context/ProjectsContext";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  const { projects } = useProjectContext();

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
            <Link className="text-brand-400 underline" to={"/create"}>
              Get started
            </Link>
          </>
        )}
        {projects && (
          <>
            {projects.map((p) => (
              <ProjectCard project={p} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
