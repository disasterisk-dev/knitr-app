import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
      <div className="flex flex-col gap-2">
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
            <div className="flex items-center gap-2" key={i}>
              <span
                className="grow rounded-inner px-4 py-2"
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
    </>
  );
};

export default ColorPicker;
