import { Link, useParams } from "react-router-dom";
import { useProjectContext } from "../context/ProjectsContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFloppyDisk, faPen } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/UserContext";

const Project = () => {
  const { id } = useParams();
  const { projects, setActiveProject } = useProjectContext();
  const { supabase, session } = useUserContext();

  const [project, setProject] = useState();
  const [notes, setNotes] = useState("");
  const [progress, setProgress] = useState(0);
  const [changes, setChanges] = useState(false);

  const material = ["Acrylic", "Wool", "Merino"];
  const weight = ["DK", "Aran", "Baby", "Chunky"];

  useEffect(() => {
    if (!projects) return;

    let p = projects.filter((p) => p.id == id);
    setProject(p[0]);
    setActiveProject(p[0]);

    if (!project) return;

    if (project.notes) {
      setNotes(project.notes);
    }

    if (project.progress) {
      setProgress(project.progress);
    }
  }, [id, projects, project]);

  async function handleSave() {
    const { error } = await supabase
      .from("projects")
      .update({ notes, progress })
      .eq("id", project.id);

    console.log("save notes");

    if (error) {
      console.log(error);
    }
  }

  function copyColor(c) {
    navigator.clipboard.writeText(c);
  }

  function checkChanges() {
    if (notes == project.notes && progress == project.progress) {
      setChanges(false);
      return false;
    }
    setChanges(true);
    return true;
  }

  return (
    <>
      {project && (
        <>
          <section className="flex grow flex-col gap-4">
            <div className="flex gap-2">
              <div>
                <img src="https://dummyjson.com/image/150" alt="" />
              </div>
              <div className="flex grow flex-col gap-2">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <span>
                  in{" "}
                  <span className="text-xl font-semibold text-subtle">
                    {weight[project.weight]} {material[project.material]}
                  </span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.colors.map((c) => (
                    <button
                      onClick={() => copyColor(c)}
                      className="flex items-center gap-1 rounded-full bg-inverse-subtle px-1.5 py-1 text-xs"
                      key={c}
                    >
                      <div
                        className="aspect-square h-4 rounded-full"
                        style={{ backgroundColor: c }}
                      ></div>
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>Progress</span>
              <input
                className="grow accent-brand-400"
                type="range"
                value={progress}
                onChange={(e) => {
                  setProgress(e.target.value);
                  checkChanges();
                }}
              />
              <span>{"(" + progress + "%)"}</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                checkChanges();
              }}
              className="grow resize-none overflow-y-auto rounded-inner bg-inverse-subtle p-2"
              name=""
              id=""
              placeholder="Write notes about this project here..."
            ></textarea>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                disabled={!changes}
                className={
                  "flex grow basis-full items-center justify-center gap-2 rounded-inner bg-brand-200 p-2 text-center font-brand text-white disabled:bg-brand-100"
                }
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                Save Changes
              </button>
              <a
                className="flex flex-1 grow items-center justify-center gap-2 rounded-inner bg-brand-200 p-2 text-center font-brand text-white"
                href={project.link}
                target="_blank"
              >
                <FontAwesomeIcon icon={faFile} />
                Pattern
              </a>
              <Link
                to={"/draw/" + project.id}
                className="flex flex-1 grow items-center justify-center gap-2 rounded-inner bg-brand-200 p-2 text-center font-brand text-white"
              >
                <FontAwesomeIcon icon={faPen} />
                Sketch
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Project;
