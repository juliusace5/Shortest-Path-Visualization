import React from 'react';
import './Grid.css'; 

const Grid = ({ rows, cols, start, end, path, onCellClick }) => {
  return (
    <div className="grid-container" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows }).map((_, rowIndex) => 
        Array.from({ length: cols }).map((_, colIndex) => {
          const isStartCell = start && start.row === rowIndex && start.col === colIndex;
          const isEndCell = end && end.row === rowIndex && end.col === colIndex;
          const isPathCell = path.some(p => p.row === rowIndex && p.col === colIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              className={`grid-cell ${isStartCell ? 'start' : ''} ${isEndCell ? 'end' : ''} ${isPathCell ? 'path' : ''}`}
            >
              {isStartCell ? 'S' : isEndCell ? 'E' : ''}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
