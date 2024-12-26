import React from 'react';
import './ClueBar.css';

class ClueBar extends React.Component {
  render() {
    return (
      <div className="cluebar">
        <span className="arrow" onClick={() => this.props.onLeftClick()}>{"〈"}</span>
      	{/* <span className="cluebar-index"><b>{this.props.puzzleIndex + this.props.direction}</b></span> */}
      	<span className="cluebar-clue" onClick={() => this.props.onClueBarClick()}>{this.props.hint}</span>
        <span className="arrow" onClick={() => this.props.onRightClick()}>{"〉"}</span>
      </div>
    );
  }
}

export default ClueBar;
