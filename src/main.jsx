import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </QueryClientProvider>,
);
