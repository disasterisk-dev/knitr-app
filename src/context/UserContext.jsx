import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error(
      "useUserContext cannot be used outside the UserContextProvider!",
    );
  }

  return context;
};

const UserContextProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    let client = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
    );

    setSupabase(client);
  }, []);

  const [session, setSession] = useState(null);

  return (
    <UserContext.Provider value={{ supabase, session, setSession }}>
      {supabase && children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
