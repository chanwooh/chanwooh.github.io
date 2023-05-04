import React from 'react';
import './Board.css';

import Square from './../Square/Square';

class Board extends React.Component {
  render() {
    return (
      <div className="board">
        {
          this.props.squares.map(square => (
            <Square squareIndex={square.squareIndex} 
                    across={square.across} 
                    down={square.down} 
                    guess={square.guess} 
                    answer={square.answer}
                    isSelected={square.isSelected}
                    isRelated={square.isRelated}
                    isGray={square.isGray}
                    isPencil={square.isPencil}
                    type={square.type}
                    onClick={() => this.props.onClick(square.squareIndex)}
                    onKeyDown={(e) => this.props.onKeyDown(e, square.squareIndex)}
            />
          ))
        }
      </div>
    );
  }
}

export default Board;
