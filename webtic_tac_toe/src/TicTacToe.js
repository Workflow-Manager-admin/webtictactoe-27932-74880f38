import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * This component renders the Tic Tac Toe game board,
   * manages game state (turns, moves, validation),
   * and displays game status, winner, or draw.
   * Color palette & theme follow project requirements.
   */

  // State: 3x3 array for board cells, true for X's turn, null for status
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  // Helper to check for winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Move handler
  function handleClick(idx) {
    // ignore click if game ended or cell filled
    if (board[idx] || calculateWinner(board)) return;

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);

    const winner = calculateWinner(nextBoard);
    if (winner) {
      setStatusMessage(`Winner: ${winner}`);
    } else if (!nextBoard.includes(null)) {
      setStatusMessage("It's a draw!");
    } else {
      setXIsNext(!xIsNext);
      setStatusMessage("");
    }
  }

  // Reset game
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatusMessage("");
  }

  // Status
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell);
  const status = statusMessage
    ? statusMessage
    : winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw!"
    : `Next turn: ${xIsNext ? "X" : "O"}`;

  // Color palette
  const COLORS = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    accent: "#2196F3",
    lightBG: "#fff",
    boardBG: "#f3f3f3",
  };

  // Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: COLORS.lightBG,
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(60,60,80,0.10)",
    padding: 32,
    maxWidth: 370,
    margin: "40px auto",
  };

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 64px)",
    gridTemplateRows: "repeat(3, 64px)",
    gap: 8,
    backgroundColor: COLORS.boardBG,
    borderRadius: 12,
    marginBottom: 24,
    border: `2px solid ${COLORS.accent}`,
  };

  const cellStyle = {
    width: 64,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.6rem",
    background: "#fff",
    border: `2px solid ${COLORS.primary}`,
    borderRadius: 8,
    cursor: "pointer",
    color: COLORS.primary,
    fontWeight: 600,
    transition: "background 0.15s, color 0.15s",
    outline: "none",
    userSelect: "none",
  };

  const oCellStyle = {
    color: COLORS.accent,
  };

  const statusStyle = {
    marginBottom: 8,
    fontSize: "1.15rem",
    fontWeight: 500,
    color: COLORS.secondary,
    textAlign: "center",
    minHeight: 28,
  };

  const restartBtn = {
    marginTop: 10,
    padding: "10px 26px",
    borderRadius: 6,
    border: "none",
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
    color: "#fff",
    fontWeight: 600,
    fontSize: "1.02rem",
    cursor: "pointer",
    boxShadow: "0 1.5px 6px -2px #9993",
  };

  return (
    <div style={containerStyle}>
      <div style={statusStyle} data-testid="game-status">
        {status}
      </div>
      <div style={boardStyle}>
        {board.map((value, i) => (
          <button
            key={i}
            style={
              value === "O"
                ? { ...cellStyle, ...oCellStyle }
                : cellStyle
            }
            onClick={() => handleClick(i)}
            disabled={winner || isDraw || value}
            aria-label={`Cell ${i + 1} (${value || "empty"})`}
            data-testid={`cell-${i}`}
          >
            {value}
          </button>
        ))}
      </div>
      {(winner || isDraw) && (
        <button onClick={handleRestart} style={restartBtn} data-testid="restart-button">
          Restart Game
        </button>
      )}
    </div>
  );
}

export default TicTacToe;
