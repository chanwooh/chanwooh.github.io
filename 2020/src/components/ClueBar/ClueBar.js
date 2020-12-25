import React from 'react';
import './ClueBar.css';

class ClueBar extends React.Component {
  render() {
    return (
      <div className="cluebar">
      	<span className="cluebar-index"><b>{this.props.puzzleIndex + this.props.direction}</b></span>
      	<span>{this.props.hint}</span>
      </div>
    );
  }
}

export default ClueBar;
