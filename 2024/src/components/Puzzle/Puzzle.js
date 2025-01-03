import React from 'react';
import './Puzzle.css';

import Board from './../Board/Board';
import ClueBar from './../ClueBar/ClueBar';
import Keyboard from 'react-simple-keyboard';
import CongratsModal from './../CongratsModal/CongratsModal';

import "react-simple-keyboard/build/css/index.css";

class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    var crossword = require('./../../data/wedding_crossword.json');
    this.state = {
      isAcross: true, 
      isComplete: false,
      isStarted: false,
      squares: crossword["squares"],
      currSquareIndex: 0,
      showModal: false
    };
  }

  handleClueRowClick(squareIndex, direction) {

    // Copy for immutability
    var updatedSquares = this.state.squares.slice();
    var isAcross = direction == "across";

    // Go through squares and update all of their props accordingly
    for (var index = 0; index < updatedSquares.length; index++) {
      var square = updatedSquares[index];
      square.isSelected = index == squareIndex;
      square.isRelated = this.state.squares[squareIndex][isAcross ? "across" : "down"]["relatedSquares"].includes(index);
    }

    if (!this.state.isStarted)
    {
      this.props.startTimer();
      this.setState({
        isAcross: true,
        isStarted: true,
        currSquareIndex: squareIndex,
        squares: updatedSquares
      });
    } else {
      this.setState({
        isAcross: isAcross,
        currSquareIndex: squareIndex,
        squares: updatedSquares
      });
    }

      
  }

  handleClick(squareIndex) {

    var updatedIsAcross = this.state.currSquareIndex == squareIndex ? !this.state.isAcross : this.state.isAcross;
    if (this.state.squares[squareIndex][updatedIsAcross ? "across" : "down"]["puzzleIndex"] == null) {
      updatedIsAcross = !updatedIsAcross;
    } 
    this.handleClueRowClick(squareIndex, updatedIsAcross ? "across" : "direction");
  }

  handleKeyboardPress(keyCode, shifted = false) {    
    if (this.state.isComplete || keyCode === NaN){

      return;

    } else if (65 <= keyCode && keyCode <= 90) {
      /* Typed an capital alpha letter */

      // Copy for immutability
      var updatedSquares = this.state.squares.slice();
      var currSquareIndex = this.state.currSquareIndex;
      var direction = this.state.isAcross ? "across" : "down";
      var relatedSquares = this.state.squares[currSquareIndex][direction]["relatedSquares"];

      // Update current square's guess
      updatedSquares[currSquareIndex]["guess"] = String.fromCharCode(keyCode);
      if (this.props.isPencil) {
        updatedSquares[currSquareIndex]["isPencil"] = true;
      } else {
        updatedSquares[currSquareIndex]["isPencil"] = false;
      }

      // Auto change to next square
      // If the current square is the last element of its related squares, move to the "nextSquareIndex" instead
      if (relatedSquares[relatedSquares.length - 1] == currSquareIndex) {
        var nextSquareIndex = updatedSquares[currSquareIndex][direction]["nextClueSquareIndex"];
        this.setState({
          currSquareIndex: nextSquareIndex == -1 ? 0 : currSquareIndex
        }, () => this.handleClick(nextSquareIndex == -1 ? 0 : nextSquareIndex));
      } else {
        this.handleClick(relatedSquares[relatedSquares.indexOf(currSquareIndex) + 1]);
      }

      this.setState({
        squares: updatedSquares
      });

    } else if (shifted && keyCode == 9 || keyCode == 126) {
      /* Shift + Tab typed, or left caret clicked */

      var previousSquareIndex = this.state.squares[this.state.currSquareIndex][this.state.isAcross ? "across" : "down"]["previousClueSquareIndex"];

      this.setState({
        currSquareIndex: previousSquareIndex < 0 ? previousSquareIndex * -1 : this.state.currSquareIndex
      }, () => this.handleClick(previousSquareIndex < 0 ? previousSquareIndex * -1 : previousSquareIndex));

    } else if (keyCode == 13 || keyCode == 9) {
      /* Typed an "Enter" or "Tab" */

      var nextSquareIndex = this.state.squares[this.state.currSquareIndex][this.state.isAcross ? "across" : "down"]["nextClueSquareIndex"];

      this.setState({
        currSquareIndex: nextSquareIndex == -1 ? 0 : this.state.currSquareIndex
      }, () => this.handleClick(nextSquareIndex == -1 ? 0 : nextSquareIndex));

    } else if (keyCode == 8 || keyCode == 123) {
      /* Typed a backspace */
      /* Currently also maps to opening brace in ascii because of keyboard layout */

      // Copy for immutability
      var updatedSquares = this.state.squares.slice();
      var currSquareIndex = this.state.currSquareIndex;
      var direction = this.state.isAcross ? "across" : "down";
      var relatedSquares = this.state.squares[currSquareIndex][direction]["relatedSquares"];

      // Update current square's guess if a letter is already there
      // Else, go to previous square and erase that one
      if (updatedSquares[currSquareIndex]["guess"] != "") {
        updatedSquares[currSquareIndex]["guess"] = "";
      } else {
        // Auto change to previous square
        // Only operates within current word
        if (relatedSquares[0] != currSquareIndex) {
          updatedSquares[relatedSquares[relatedSquares.indexOf(currSquareIndex) - 1]]["guess"] = "";
          this.handleClick(relatedSquares[relatedSquares.indexOf(currSquareIndex) - 1]);
        }
      }

      this.setState({
        squares: updatedSquares
      });
    }

    if (this.state.squares.every(square => (square.guess == square.answer))) {
      /* Solved the puzzle */

      // Do something special
      this.setState({
        isComplete: true,
        showModal: true
      });

      // Stop timer
      this.props.stopTimer();
    }
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    var layout = {
      'default': [
        'Q W E R T Y U I O P',
        'A S D F G H J K L',
        'Z X C V B N M {bksp}',
      ]
    };
    var display = {
      '{bksp}': 'del',
    }
    return (
      <div className="puzzle">
        <section className="cluebar-board">
          <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} onKeyDown={(e) => this.handleKeyboardPress(e.keyCode, e.shifted)} />
          <ClueBar direction={this.state.isStarted ? (this.state.isAcross ? "A" : "D") : ""}
                   puzzleIndex={this.state.isStarted ? this.state.squares[this.state.currSquareIndex][this.state.isAcross ? "across" : "down"]["puzzleIndex"] : ""}
                   hint={this.state.isStarted ? this.state.squares[this.state.currSquareIndex][this.state.isAcross ? "across" : "down"]["hint"]: "Click on any cell to start!"} 
                   onClueBarClick={() => this.handleClick(this.state.currSquareIndex)}
                   onLeftClick={() => this.handleKeyboardPress('~'.charCodeAt(0))}
                   onRightClick={() => this.handleKeyboardPress('\t'.charCodeAt(0))}
                   />
          <Keyboard layout={layout} display={display} onKeyPress={(c) => this.handleKeyboardPress(c.charCodeAt(0))}/>
        </section>
        <CongratsModal show={this.state.showModal} hideModal={() => this.hideModal()}/>
      </div>
    );
  }
}

export default Puzzle;
