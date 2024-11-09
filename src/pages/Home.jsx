import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";
import { useProjectContext } from "../context/ProjectsContext";

const Home = () => {
  const { projects } = useProjectContext();

  return (
    <>
      <section className="flex h-full grow flex-col items-center justify-center gap-4">
        {!projects && (
          <>
            <FontAwesomeIcon
              icon={faMitten}
              className="animate-wiggle text-5xl text-brand-300"
            />
            <h2 className="text-center font-brand text-3xl font-semibold text-subtle">
              Welcome to Knitr!
            </h2>
          </>
        )}
        {projects && (
          <>
            {projects.map((p) => (
              <span>{p.title}</span>
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
