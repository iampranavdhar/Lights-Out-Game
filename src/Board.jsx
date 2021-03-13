import React, { useState } from "react";
import Cell from "./Cell";
import './Board.css';

function Board() {

  let [board, setBoard] = useState(createBoard);
  let [hasWon, sethasWon] = useState(false);
  let [tries,setTries] = useState(20);

  function createBoard() {
    let board = [];
    // creating array-of-arrays of true/false values
    for (let y = 0; y < 4; y++) {
      let row = [];
      for (let x = 0; x < 9; x++) {
        row.push(Math.random() < 0.25);
      }
      board.push(row);
    }
    return board;
  }
  /**Changing a cell: Updating board & determining if winner */

  function flipCellsAround(coord) {
    let newboard = Object.assign([],board);   
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < 9 && y >= 0 && y < 4) {
        newboard[y][x] = !newboard[y][x];
      }
    }

    // Flipping this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    // Win when every cell is turned off
    // Determining is the game has been won
    let hasWon = board.every((row) =>
      row.every((cell) => {
        return cell === false;
      })
    );

    let left = tries
    left--
    setTries(left);
    setBoard(newboard);
    sethasWon(hasWon);
  }

  /** Rendering game board or winning message. */


  const tableBoard = [];
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 9; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          coord={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={flipCellsAround}
        />
      );
    }
    tableBoard.push(<tr key={`row${y}`}>{row}</tr>);
  }
  

  return (
    hasWon
      ? (
        <div>
          <h1 className='title'>Lights Out</h1>
          <h2 className='winningMessage'>Winner!</h2>
        </div>
      )
      : tries>0
      ?(
        <div>
          <h1 className='title'>Lights Out</h1>
          <table className="Board">
            <tbody>{tableBoard}</tbody>
          </table>
          <div className='left'>
            Tries left: {tries}
          </div>
        </div>
      )
      :(
        <div>
          <h className='over'>Game Over</h>
          <h className='over'> You Lost!</h>
          <div className='left'>
            Tries left: {tries}
          </div>
        </div>
        
      ));
}


export default Board;