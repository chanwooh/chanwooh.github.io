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
              "Please take a screenshot of your solve time and upload here: https://drive.google.com/drive/folders/1QkkGVPFrqXNKFxdNA0OiYLiEw_ttlbyk?usp=sharing. Thank you so much for coming to our wedding 😊"
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CongratsModal;
