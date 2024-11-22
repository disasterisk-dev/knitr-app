import { createContext, useState, useContext } from "react";
import { useUserContext } from "./UserContext";

const ProjectContext = createContext();

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw Error(
      "useProjectContext cannot be used outside the ProjectContextProvider component",
    );
  }

  return context;
};

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  const { supabase, session } = useUserContext();

  const materials = ["Acrylic", "Wool", "Merino"];
  const weights = ["DK", "Aran", "Baby", "Chunky"];

  async function deleteProject() {
    const response = await supabase
      .from("projects")
      .delete()
      .eq("id", activeProject.id);
    return response;
  }

  async function fetchProjectsAll() {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("owner", session.user.id);

    if (error) return error;

    return data;
  }

  async function fetchProject(id) {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("owner", session.user.id)
      .eq("id", id);

    if (error) return error;

    return data;
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setProjects,
        fetchProjectsAll,
        fetchProject,
        setActiveProject,
        deleteProject,
        materials,
        weights,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
