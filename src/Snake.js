import React from "react";

function Snake({ snake, x, y }) {
  const isSnake = snake.some(
    (segment) => segment.x === x && segment.y === y
  );

  if (!isSnake) return null;

  const isHead = snake[0].x === x && snake[0].y === y;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: isHead
          ? "yellow"
          : "linear-gradient(45deg, #00ffcc, #00cc99)",
        borderRadius: "6px",
        boxShadow: isHead
          ? "0 0 12px yellow"
          : "0 0 10px #00ffcc",
      }}
    />
  );
}

export default Snake;