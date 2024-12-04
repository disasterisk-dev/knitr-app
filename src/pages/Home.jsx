import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import GetStarted from "../components/GetStarted";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const queryClient = useQueryClient();
  const { supabase, session } = useUserContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select()
        .eq("owner", session.user.id);

      return data;
    },
  });

  return (
    <>
      <section className="flex h-full grow flex-col items-stretch gap-4">
        {isError && <p>Something went wrong: {error.message}</p>}
        {!data && !isLoading && <GetStarted />}
        {!data && isLoading && <LoadingSpinner />}
        {data && data.length > 0 && (
          <>
            {data.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
