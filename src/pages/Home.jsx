import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <section className="flex flex-col h-full justify-center items-stretch gap-4">
        <FontAwesomeIcon
          icon={faMitten}
          className="text-brand-300 animate-wiggle text-5xl"
        />
        <h2 className="text-center font-brand font-semibold text-subtle text-3xl">
          Welcome to Knitr!
        </h2>
      </section>
    </>
  );
};

export default Home;
