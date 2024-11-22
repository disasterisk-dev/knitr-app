import { Link, useNavigate } from "react-router-dom";
import { useProjectContext } from "../context/ProjectsContext";

const ProjectCard = ({ project }) => {
  return (
    <Link to={"/project/" + project.id}>
      <div className="flex overflow-hidden rounded-outer bg-inverse-subtle">
        <div>
          <img src="https://dummyjson.com/image/100x150" alt="" />
        </div>
        <div className="flex grow flex-col p-2">
          <h3 className="text-2xl font-semibold">{project.title}</h3>
        </div>
        <div className="flex justify-stretch">
          <div className="flex select-none flex-col">
            {project.colors.map((c, i) => (
              <div
                key={c}
                style={{ backgroundColor: c, color: c }}
                className="w-4 grow"
              >
                c
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
