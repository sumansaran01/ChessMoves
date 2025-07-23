import React, { useState } from 'react';
import './App.css';

const files = ['A','B','C','D','E','F','G','H'];
const ranks = ['8','7','6','5','4','3','2','1']; // Render from top (8) to bottom (1)
const pieceOptions = ['Queen', 'Bishop', 'Rook', 'Knight'];
const pieceSymbols = { Queen: '♕', Bishop: '♗', Rook: '♖', Knight: '♘' };

function posKey(file, rank) {
  return file + rank;
}

function getInitialBoard(positions) {
  const board = {};
  for (const [piece, pos] of Object.entries(positions)) {
    board[pos] = piece;
  }
  return board;
}

const defaultPositions = {
  Queen: 'E7',
  Bishop: 'B7',
  Rook: 'G5',
  Knight: 'C3',
};

function App() {
  const [positions, setPositions] = useState(defaultPositions);
  const [selectedPiece, setSelectedPiece] = useState('Queen');
  const [validMoves, setValidMoves] = useState([]);
  const [error, setError] = useState('');
  const [dragPiece, setDragPiece] = useState(null);

  const board = getInitialBoard(positions);

  const handleSquareClick = (file, rank) => {
    const pos = posKey(file, rank);
    // If dragging a piece, move it here
    if (dragPiece) {
      // Prevent placing two pieces on the same square
      if (Object.values(positions).includes(pos)) return;
      setPositions({ ...positions, [dragPiece]: pos });
      setDragPiece(null);
      setValidMoves([]);
      setError('');
      return;
    }
    // If clicking a piece, start dragging
    const piece = board[pos];
    if (piece) {
      setDragPiece(piece);
    }
  };

  const handleGetMoves = async () => {
    setError('');
    setValidMoves([]);
    try {
      const res = await fetch(`http://localhost:8000/chess/${selectedPiece.toLowerCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postions: positions }),
      });
      const data = await res.json();
      if (res.ok) setValidMoves(data.valid_moves);
      else setError(data.error || 'Error fetching moves');
    } catch (err) {
      setError('Could not connect to backend');
    }
  };

  return (
    <div className="App">
      <h2>Chess Valid Moves Finder</h2>
      <div style={{ marginBottom: 10 }}>
        <label>
          Select Piece:
          <select value={selectedPiece} onChange={e => setSelectedPiece(e.target.value)}>
            {pieceOptions.map(piece => (
              <option key={piece} value={piece}>{piece}</option>
            ))}
          </select>
        </label>
        <button onClick={handleGetMoves} style={{ marginLeft: 10 }}>Get Valid Moves</button>
        {dragPiece && <span style={{ marginLeft: 20, color: 'orange' }}>Placing: {dragPiece}</span>}
      </div>
      <div className="chessboard">
        {ranks.map(rank => (
          <div className="board-row" key={rank}>
            {files.map(file => {
              const pos = posKey(file, rank);
              const piece = board[pos];
              const isValid = validMoves.includes(pos);
              return (
                <div
                  key={pos}
                  className={`board-square${(files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0 ? ' light' : ' dark'}${isValid ? ' valid-move' : ''}`}
                  onClick={() => handleSquareClick(file, rank)}
                >
                  {piece && <span className="piece">{pieceSymbols[piece]}</span>}
                  {!piece && isValid && <span className="dot">•</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>Instructions:</strong>
        <ul style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
          <li>Click a piece to pick it up, then click a square to place it.</li>
          <li>Use the dropdown to select which piece to analyze.</li>
          <li>Click "Get Valid Moves" to highlight valid moves for the selected piece.</li>
        </ul>
      </div>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
}

export default App;
