import React from "react";

import styles from "./styles.module.scss";

export const ColorPicker = ({ colors, colorNum, setColorNum }) => {
  const handleColorClick = (index) => {
    setColorNum(index);
  };
  return (
    <div className={styles.colors}>
      <ul>
        {colors.map((color, index) => (
          <li
            className={[styles.color, colorNum === index && styles.active].join(
              " "
            )}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(index)}
            key={index}
          ></li>
        ))}
      </ul>
    </div>
  );
};
