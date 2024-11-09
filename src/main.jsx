import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProjectContextProvider } from "./context/ProjectsContext";

createRoot(document.getElementById("root")).render(
  <ProjectContextProvider>
    <App />
  </ProjectContextProvider>,
);
