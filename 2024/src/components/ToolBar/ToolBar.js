import React from 'react';
import './ToolBar.css';
import Timer from 'react-compound-timer';

function ToolBar(props) {
	var buttonClassName = props.isPencil ? "active" : "";
	const timerRef = React.useRef(null);

	// Pause when puzzle is complete
	React.useEffect(() => {
	    if (props.isComplete) {
	      timerRef.current.pause();
	    }
	}, [props.isComplete]);

	// Start when puzzle is started
	React.useEffect(() => {
	    if (props.isStarted) {
	      timerRef.current.start();
	    }
	}, [props.isStarted]);

    return (
      <div className="toolbar-wrapper">
      	<ul className="toolbar-tools">
      		<li className="toolbar-timer">
      			<Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} startImmediately={false} ref={timerRef}>
      				<div className="timer">
	      				<b><Timer.Minutes />&nbsp;:&nbsp;
	      				<Timer.Seconds /></b>
	      			</div>
      			</Timer>
      		</li>
      		<li className="toolbar-pencil">
      			<button className={buttonClassName} onClick={props.isPencil ? props.penIn : props.pencilIn}>
      				<i className="material-icons">edit</i>
      			</button>
      		</li>
      	</ul>
      </div>
    );
}

export default ToolBar;
