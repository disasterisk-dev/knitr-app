import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import { useProjectContext } from "./context/ProjectsContext";

function App() {
  const { setProjects } = useProjectContext();

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects"));
    setProjects(projects);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="flex grow flex-col items-stretch gap-4 px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
