import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Project from "./pages/Project";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUserContext } from "./context/UserContext";
import Draw from "./pages/Draw";

function App() {
  const { supabase, session, setSession } = useUserContext();

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(
      ({ data: { session } }) => {
        setSession(session);
      },
      [supabase],
    );

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [setSession, supabase]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className="flex w-full grow flex-col items-stretch gap-4 overflow-y-auto px-4 py-8 md:w-1/2">
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
              <Route exact path="/create/:id" element={<Create />} />
              <Route exact path="/project/:id" element={<Project />} />
              <Route exact path="/draw/:id" element={<Draw />} />
            </Routes>
          )}
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
