import React from 'react';
// import court from './court_edited.png';
import jingle from './nytcrosswordjingle.mp3';
import './CongratsModal.css';

class CongratsModal extends React.Component {
  render() {
    var className = this.props.show ? "modal-wrapper show" : "modal-wrapper";
    let audio = new Audio(jingle);
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
              "Congratulations you solved puzzle! Cheers to many more years of solving things together 🙂"
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CongratsModal;
