import React from 'react';
import './ClueRow.css';

function ClueRow(props) {
	var className = props.isSelected ? "cluerow isSelected" : "cluerow";
  	const cluerowRef = React.useRef(null);
	React.useEffect(() => {
	    if (props.isSelected && cluerowRef.current) {
	      cluerowRef.current.scrollIntoView({behavior: "smooth"});
	    }
	}, [props.isSelected]);
	return (
      <li className={className} ref={cluerowRef} onClick={props.onClick} tabindex="0">
      	<span className="index"><b>{props.puzzleIndex}</b></span>
      	<span className="hint">{props.hint}</span>
      </li>
    );
}

export default ClueRow;
