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

const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "DELETE":
      // filter out the selected blog
      return state;
    case "CREATE":
      state.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state));
    default:
      return state;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(ProjectReducer, null);
  const [activeProject, setActiveProject] = useState(null);

  function setProjects(projects) {
    dispatch({ type: "SET", payload: projects });
  }

  function createProject(project) {
    if (projects == null) {
      dispatch({ type: "SET", payload: [] });
    }

    dispatch({ type: "CREATE", payload: project });
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setProjects,
        createProject,
        setActiveProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
