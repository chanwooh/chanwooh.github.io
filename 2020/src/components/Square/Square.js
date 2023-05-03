import React from 'react';
import './Square.css';

class Square extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isSelected != this.props.isSelected ||
      nextProps.isRelated != this.props.isRelated ||
      nextProps.guess != this.props.guess;
  }

  render() {
    if (this.props.type === "EMPTY") {
      var puzzleIndex = this.props.across.isHead ? this.props.across.puzzleIndex : (this.props.down.isHead ? this.props.down.puzzleIndex : "");
      var placeholder = (<div className="placeholder"></div>);

      var squareClassName = "square empty-square";
      squareClassName += this.props.isRelated ? " related" : "";
      squareClassName += this.props.isSelected ? " selected" : "";

      var guessClassName = this.props.isPencil ? "guess pencil" : "guess";

      if (this.props.squareIndex === 0) {
        console.log("first square");
        return(
          <div className={squareClassName} width="33" height="33" onClick={this.props.onClick} tabIndex="0" onKeyDown={this.props.onKeyDown}>
            <span className="puzzleIndex">
              {puzzleIndex == "" ? placeholder : puzzleIndex}
            </span>
            <span className={guessClassName} autoFocus>
              {this.props.guess}
            </span>
          </div>
        );
      } else {
        return(
          <div className={squareClassName} width="33" height="33" onClick={this.props.onClick} tabIndex="0" onKeyDown={this.props.onKeyDown}>
            <span className="puzzleIndex">
              {puzzleIndex == "" ? placeholder : puzzleIndex}
            </span>
            <span className={guessClassName}>
              {this.props.guess}
            </span>
          </div>
        );
      }
      
    } else {
      return(
          <div className="square black-square" width="33" height="33" tabIndex="-1"></div>
      );
    }
  }
}

export default Square;
