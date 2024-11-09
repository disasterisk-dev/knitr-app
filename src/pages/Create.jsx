import { useState } from "react";
import { v4 as uuid } from "uuid";
import ColorPicker from "../components/ColorPicker";
import { useProjectContext } from "../context/ProjectsContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [material, setMaterial] = useState(0);
  const [weight, setWeight] = useState(0);
  const [colors, setColors] = useState([]);

  const { createProject } = useProjectContext();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    const newProject = {
      id: uuid(),
      title,
      link,
      material,
      weight,
      colors,
    };

    createProject(newProject);
    navigate("/");
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-subtle">New Project</h2>
      <form className="flex flex-col justify-stretch gap-2">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-inner border-2 bg-inverse-subtle px-2 py-2 outline-none focus:border-brand-500"
        />

        <label htmlFor="link">Link to Pattern</label>
        <input
          type="text"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="rounded-inner border-2 bg-inverse-subtle px-2 py-2 outline-none focus:border-brand-500"
        />

        <label htmlFor="material">Material</label>
        <select
          name="material"
          id="material"
          className="rounded-inner border-2 bg-inverse-subtle px-2 py-2 outline-none focus:border-brand-500"
          defaultValue={material}
          onChange={(e) => setMaterial(Number(e.target.value))}
        >
          <option value={0}>Acrylic</option>
          <option value={1}>Wool</option>
          <option value={2}>Merino</option>
        </select>

        <label htmlFor="weight">Weight</label>
        <select
          name="weight"
          id="weight"
          className="rounded-inner border-2 bg-inverse-subtle px-2 py-2 outline-none focus:border-brand-500"
          defaultValue={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        >
          <option value={0}>DK</option>
          <option value={1}>Aran</option>
          <option value={2}>Baby</option>
          <option value={3}>Chunky</option>
        </select>

        <label htmlFor="colors">Palette</label>
        <ColorPicker colors={colors} setColors={setColors} />

        <button
          className="rounded-inner bg-brand-300 py-4 font-brand text-2xl font-semibold text-inverse"
          onClick={handleCreate}
        >
          Save Project
        </button>
      </form>
    </>
  );
};

export default Create;
