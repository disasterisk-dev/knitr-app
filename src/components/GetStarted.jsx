import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMitten } from "@fortawesome/free-solid-svg-icons";

const GetStarted = () => {
  return (
    <>
      <FontAwesomeIcon
        icon={faMitten}
        className="animate-wiggle text-5xl text-brand-300"
      />
      <h2 className="text-center font-brand text-3xl font-semibold text-subtle">
        Welcome to Knitr!
      </h2>
      <Link className="text-center text-brand-400 underline" to={"/create"}>
        Get started
      </Link>
    </>
  );
};

export default GetStarted;
