import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { formatDistance } from "date-fns";

const ProjectCard = ({ project }) => {
  const { supabase } = useUserContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["imgUrl" + project.id],
    queryFn: async () => {
      if (!project.thumbnailUrl) return Error();

      const { data, error } = await supabase.storage
        .from("thumbnails")
        .createSignedUrl("/" + project.thumbnailUrl, 60);

      if (error) return error;

      return data.signedUrl;
    },
  });

  return (
    <Link to={"/project/" + project.id}>
      <div className="flex overflow-hidden rounded-outer bg-inverse-subtle">
        <div className="h-[150px] w-[100px] overflow-hidden">
          {(isLoading || !project.thumbnailUrl) && (
            <img src="https://dummyjson.com/image/100x150" alt="" />
          )}
          {data && <img className="w-full object-cover" src={data} alt="" />}
        </div>
        <div className="flex grow flex-col p-2">
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <div className="grow text-sm">
            {project.progress === 100 && <span>Finished</span>}
            {project.progress === 0 && <span>Not Started</span>}
            {project.progress !== 100 &&
              project.progress !== 0 &&
              project.progress !== 100 && <span>{project.progress}% done</span>}
          </div>
          <span className="text-xs text-brand-200">
            {formatDistance(project.created_at, new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="flex justify-stretch">
          <div className="flex select-none flex-col">
            {project.colors.map((c) => (
              <div
                key={c}
                style={{ backgroundColor: c, color: c }}
                className="w-4 grow"
              >
                c
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
