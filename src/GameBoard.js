import React from "react";
import Snake from "./Snake";
import Food from "./Food";

const GRID_SIZE = 20;

function GameBoard({ snake, food }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
        gap: "2px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);

        return (
          <div
            key={index}
            style={{
              width: "100px",
              height: "30px",
              background: "#111",
            }}
          >
            <Snake snake={snake} x={x} y={y} />
            <Food food={food} x={x} y={y} />
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;