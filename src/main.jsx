import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProjectContextProvider } from "./context/ProjectsContext";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <ProjectContextProvider>
      <App />
    </ProjectContextProvider>
  </UserContextProvider>,
);
