import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hexRgb from "hex-rgb";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";

const ColorPicker = ({ colors, setColors }) => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [width, setWidth] = useState("300px");

  const handleColor = (color) => {
    setCurrentColor(color.hex);
    const newColors = colors;
    newColors.push(color.hex);
    setColors([...new Set(newColors)]);
  };

  const handleRemoveColor = (e, index) => {
    e.preventDefault();

    if (!confirm("Remove this colour?")) return;

    const newColors = colors.filter((c) => colors.indexOf(c) !== index);
    setColors(newColors);
  };

  useEffect(() => {
    const getWidth = document
      .getElementById("picker-container")
      .getBoundingClientRect().width;
    setWidth(getWidth - 16);
  }, []);

  return (
    <>
      <div id="picker-container" className="flex flex-col gap-2">
        <SketchPicker
          width={width}
          disableAlpha
          className=""
          onChangeComplete={handleColor}
          color={currentColor}
        />
      </div>
      <div className="flex gap-2">
        {colors.map((c, i) => {
          let colorRGB = hexRgb(c);
          let o = Math.round(
            (parseInt(colorRGB.red) * 299 +
              parseInt(colorRGB.green) * 587 +
              parseInt(colorRGB.blue) * 114) /
              1000,
          );

          let textColor = o > 150 ? "#3D3D3D" : "#FDFDFD";

          return (
            <button
              onClick={(e) => handleRemoveColor(e, i)}
              className="flex items-center gap-1 rounded-full bg-inverse-subtle px-1.5 py-1 text-xs"
              key={c}
            >
              <div
                className="aspect-square h-4 rounded-full"
                style={{ backgroundColor: c }}
              ></div>
              <span>{c}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ColorPicker;
