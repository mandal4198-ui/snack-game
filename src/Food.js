import React from "react";

function Food({ food, x, y }) {
  if (food.x !== x || food.y !== y) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "red",
        borderRadius: "50%",
      }}
    />
  );
}

export default Food;