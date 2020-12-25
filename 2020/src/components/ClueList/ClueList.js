import React from 'react';
import './ClueList.css';

import ClueRow from './../ClueRow/ClueRow';

function ClueList(props) {

  	var relevantSquares = props.squares.filter(square => (square[props.direction]["isHead"]));

    return (
      <div className="cluelist">
      	<h3>{props.direction.toUpperCase()}</h3>
      	<ol>
	      	{
	      		relevantSquares.map(square => (
		      		<ClueRow isSelected={props.direction == props.currentDirection && square["isRelated"]} 
                puzzleIndex={square[props.direction]["puzzleIndex"]} 
                hint={square[props.direction]["hint"]} 
                onClick={() => props.onClick(square["squareIndex"], props.direction)} />
	      		))
	      	}	
      	</ol>
      </div>
    );
}

export default ClueList;
