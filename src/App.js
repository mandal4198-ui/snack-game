import React, { useState, useEffect } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

function App() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");

  // 🎮 Keyboard control
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // 🐍 Move snake
  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 120);

    return () => clearInterval(interval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    newSnake.unshift(head);

    // 🍎 Eat food
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
    } else {
      newSnake.pop();
    }

    // 💥 Collision
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE
    ) {
      alert("Game Over");
      setSnake([{ x: 10, y: 10 }]);
      return;
    }

    setSnake(newSnake);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🐍 Realistic Snake Game</h1>
      <div
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          margin: "auto",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          backgroundColor: "#111",
          border: "3px solid #444",
        }}
      >
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);

          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                boxSizing: "border-box",
                background: isHead
                  ? "linear-gradient(135deg, #00ffcc, #00cc99)"
                  : isSnake
                  ? "linear-gradient(135deg, #33ff66, #009933)"
                  : isFood
                  ? "radial-gradient(circle, red 40%, darkred 70%)"
                  : "#222",
                borderRadius: isSnake ? "6px" : "0px",
                boxShadow: isFood
                  ? "0 0 10px red"
                  : isHead
                  ? "0 0 8px #00ffcc"
                  : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
