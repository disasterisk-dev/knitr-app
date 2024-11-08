import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hexRgb from "hex-rgb";
import { useState } from "react";
import {
  BlockPicker,
  CirclePicker,
  SketchPicker,
  TwitterPicker,
} from "react-color";
import { ColorPicker } from "react-color-palette";

const Create = () => {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const handleColor = (color, event) => {
    setCurrentColor(color.hex);
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    console.log(currentColor);
    const newColors = colors;
    newColors.push(currentColor);
    setColors(newColors);
  };

  const handleRemoveColor = (e, index) => {
    e.preventDefault();
    const newColors = colors.filter((c) => colors.indexOf(c) !== index);
    setColors(newColors);
  };

  return (
    <section className="w-full">
      <h2 className="">New Project</h2>
      <form className="flex flex-col gap-2 justify-stretch">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="title"
          className="bg-inverse-subtle rounded-inner px-2 py-2 outline-none focus:border-brand-500 border-2"
        />

        <label htmlFor="colors">Palette</label>
        <div className="flex gap-2 items-start">
          <div className="flex flex-col gap-2">
            <SketchPicker
              disableAlpha
              className=""
              onChange={handleColor}
              color={currentColor}
            />
            <button
              onClick={handleAddColor}
              className="bg-brand-300 p-2 rounded-inner font-brand font-semibold text-inverse"
            >
              Add Colour
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {colors.map((c, i) => {
              let colorRGB = hexRgb(c);
              let o = Math.round(
                (parseInt(colorRGB.red) * 299 +
                  parseInt(colorRGB.green) * 587 +
                  parseInt(colorRGB.blue) * 114) /
                  1000
              );

              let textColor = o > 150 ? "#3D3D3D" : "#FDFDFD";

              return (
                <div className="flex gap-2">
                  <span
                    className="grow px-4 py-2 rounded-inner"
                    style={{ backgroundColor: c, color: textColor }}
                  >
                    {c}
                  </span>
                  <button
                    className="text-2xl"
                    style={{ color: c }}
                    onClick={(e) => handleRemoveColor(e, i)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Create;
