import React from 'react';
import court from './court_edited.png';
import summerdrink from './summerdrink.mp3';
import './CongratsModal.css';

class CongratsModal extends React.Component {
  render() {
    var className = this.props.show ? "modal-wrapper show" : "modal-wrapper";
    let audio = new Audio(summerdrink);
    if (this.props.show) {
      audio.play();
    }

    return (
      <div class={className}>
        <div class="modal-body">
          <span class="modal-body-close" tabindex="0" onClick={this.props.hideModal}>&times;</span>
          <div class="content">
            <h2 class="title">Congratulations!</h2>
            <img className="congrats-court" src={court}/>
            <div class="center">
              "Merry Christmas! Hope you enjoyed this crossword as much as I enjoyed spending time with you this year! Love you :)"
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CongratsModal;
