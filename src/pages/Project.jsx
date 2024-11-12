import { useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectsContext";
import { useEffect, useState } from "react";

const Project = () => {
  const { id } = useParams();
  const { projects } = useProjectContext();
  const [project, setProject] = useState();

  useEffect(() => {
    if(!projects) return

    let p = projects.filter((p) => p.id == id)
    setProject(p[0])
  }, [id, projects])

  return (
    <>
    {project && (
      <>
      <h2>{project.title}</h2>
      </>
    )}
    </>
  );
};

export default Project;
