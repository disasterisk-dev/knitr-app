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
      let filtered = state.filter((p) => p.id != action.id)
      
      if(filtered == []) return null
      return filtered
    case "CREATE":
      state.push(action.payload);
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
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function deleteProject(id){
    dispatch({type: "DELETE", id: id})
    
    if(projects != []){
      localStorage.setItem("projects", JSON.stringify(projects));
      return;
    }

    localStorage.removeItem("projects");
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        setProjects,
        createProject,
        deleteProject,
        setActiveProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
