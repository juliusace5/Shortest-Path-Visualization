import React, { useState } from 'react';
import Grid from './Components/Grid';
import './App.css'; 

const App = () => {
  const [rows] = useState(5);
  const [cols] = useState(5);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);


  const handleCellSelection = (row, col) => {
    if (!startPoint) {
      setStartPoint({ row, col });
    } else if (!endPoint) {
      setEndPoint({ row, col });
    }
  };

  
  const calculateShortestPath = () => {
    if (!startPoint || !endPoint) return;

    const queue = [{ position: startPoint, path: [startPoint] }];
    const visited = new Set();

    while (queue.length) {
      const { position, path: currentPath } = queue.shift();
      const { row, col } = position;

      
      if (row === endPoint.row && col === endPoint.col) {
        setShortestPath(currentPath);
        return;
      }

     
      const directions = [
        { row: 0, col: 1 }, 
        { row: 1, col: 0 },  
        { row: 0, col: -1 },
        { row: -1, col: 0 }, 
      ];

      for (const direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        const positionIdentifier = `${newRow}-${newCol}`;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited.has(positionIdentifier)) {
          visited.add(positionIdentifier);
          queue.push({
            position: { row: newRow, col: newCol },
            path: [...currentPath, { row: newRow, col: newCol }],
          });
        }
      }
    }
  };

  return (
    <div>
      <h1>Visualize Shortest Path</h1>
      <Grid 
        rows={rows} 
        cols={cols} 
        start={startPoint} 
        end={endPoint} 
        path={shortestPath} 
        onCellClick={handleCellSelection} 
      />
      <button onClick={calculateShortestPath}>Find Shortest Path</button>
    </div>
  );
};

export default App;
