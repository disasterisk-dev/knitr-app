import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import { useProjectContext } from "./context/ProjectsContext";
import Project from "./pages/Project";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUserContext } from "./context/UserContext";

function App() {
  const { setProjects } = useProjectContext();
  const { supabase, session, setSession } = useUserContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();

    const projects = JSON.parse(localStorage.getItem("projects"));
    setProjects(projects);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="flex grow flex-col items-stretch gap-4 px-4 py-8">
          {!session && (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
            />
          )}
          {session && (
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/project/:id" element={<Project />} />
            </Routes>
          )}
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
