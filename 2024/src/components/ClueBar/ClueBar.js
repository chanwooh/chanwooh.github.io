import React from 'react';
import './ClueBar.css';

class ClueBar extends React.Component {
  render() {
    return (
      <div className="cluebar">
        <span className="arrow">{"〈"}</span>
      	{/* <span className="cluebar-index"><b>{this.props.puzzleIndex + this.props.direction}</b></span> */}
      	<span className="cluebar-clue">{this.props.hint}</span>
        <span className="arrow">{"〉"}</span>
      </div>
    );
  }
}

export default ClueBar;
