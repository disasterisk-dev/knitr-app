import { createContext, useContext, useState } from "react";
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
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
  );

  const [session, setSession] = useState(null);

  return (
    <UserContext.Provider value={{ supabase, session, setSession }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
