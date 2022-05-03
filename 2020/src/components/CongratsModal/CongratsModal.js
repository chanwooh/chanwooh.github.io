import React from 'react';
// import court from './court_edited.png';
import summerdrink from './nytcrosswordjingle.mp3';
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
            <div class="center">
              "Congratulations! You completed the Mini Jessie Crossword! Happy Birthday! So thankful to have you as a manager and to navigate all these fun healthcare complexities (and abbreviations) together!"
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CongratsModal;
