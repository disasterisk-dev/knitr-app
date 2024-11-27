import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner = () => {
  return (
    <div className="flex grow items-center justify-center">
      <FontAwesomeIcon
        className="animate-spin text-3xl text-brand-500"
        icon={faSpinner}
      />
    </div>
  );
};

export default LoadingSpinner;
