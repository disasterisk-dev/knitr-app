import { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useProjectContext } from "../context/ProjectsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faFloppyDisk,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/UserContext";

const Draw = () => {
  const { id } = useParams();
  const {
    activeProject,
    setActiveProject,
    projects,
    fetchProject,
    setProjects,
  } = useProjectContext();
  const { supabase } = useUserContext();

  const [height, setHeight] = useState(300);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeColor, setStrokeColor] = useState("#000");
  const [erase, setErase] = useState(true);
  const [canvasData, setCanvasData] = useState();

  const canvasRef = createRef();

  useEffect(() => {
    if (projects.length == 0) {
      fetchProject(id).then((d) => {
        setProjects(d);
      });
    }

    let p = projects.filter((p) => p.id == id);
    setActiveProject(p[0]);

    if (activeProject) {
      setStrokeColor(activeProject.colors[0]);

      const getHeight = document
        .getElementById("canvas-container")
        .getBoundingClientRect().height;
      setHeight(getHeight);

      if (activeProject.canvasData) {
        const data = JSON.parse(activeProject.canvasData);
        canvasRef.current.loadPaths(data);
      }
    }
  }, [
    activeProject,
    projects,
    id,
    canvasRef,
    fetchProject,
    setActiveProject,
    setProjects,
  ]);

  function handleErase() {
    setErase(erase ? false : true);
    canvasRef.current.eraseMode(erase);
  }

  async function handleSave() {
    canvasRef.current.exportPaths().then(async (d) => {
      const dataString = JSON.stringify(d);
      setCanvasData(dataString);

      const { error } = await supabase
        .from("projects")
        .update({ canvasData })
        .eq("id", activeProject.id);

      if (error) {
        console.log(error);
      }
    });
  }

  return (
    <>
      {activeProject && (
        <div className="flex grow flex-col gap-2">
          <div className="grow" id="canvas-container">
            <ReactSketchCanvas
              style={{
                border: "0",
              }}
              width="100%"
              height={height}
              strokeWidth={strokeWidth}
              strokeColor={strokeColor}
              ref={canvasRef}
            />
          </div>
          <div className="flex gap-2 rounded-outer bg-inverse-subtle p-2 font-brand text-xl text-inverse">
            <select
              className="grow basis-1 rounded-inner bg-brand-200 p-2"
              onChange={(e) => setStrokeWidth(e.target.value)}
              value={strokeWidth}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button
              className="aspect-square rounded-inner bg-brand-200 p-2"
              onClick={handleErase}
            >
              <FontAwesomeIcon icon={faEraser} />
            </button>
            <button
              className="aspect-square rounded-inner bg-brand-200 p-2"
              onClick={() => canvasRef.current.undo()}
            >
              <FontAwesomeIcon icon={faUndo} />
            </button>
            <button
              className="aspect-square rounded-inner bg-brand-200 p-2"
              onClick={() => canvasRef.current.redo()}
            >
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <button
              className="aspect-square rounded-inner bg-brand-200 p-2"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 flex flex-col gap-2">
            {activeProject.colors.map((c) => (
              <button
                key={c}
                onClick={() => setStrokeColor(c)}
                className="border-1 aspect-square h-6 rounded-full"
                style={{ backgroundColor: c }}
              ></button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Draw;
