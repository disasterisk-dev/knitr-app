import { createContext, useReducer, useState, useContext } from "react";

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
  const [projects, setProjects] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setProjects,
        setActiveProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
