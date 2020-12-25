import React from 'react';
import './Layout.css';

import Header from './../Header/Header';
import ToolBar from './../ToolBar/ToolBar';
import Puzzle from './../Puzzle/Puzzle';

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isComplete: false,
            isPencil: false
        };
    }

    stopTimer() {
        this.setState({isComplete: true});
    }

    pencilIn() {
        this.setState({isPencil: true});
    }

    penIn() {
        this.setState({isPencil: false});
    }

    render() {
        return (
            <div className="layout">
                <Header />
                <ToolBar penIn={() => {this.penIn()}} pencilIn={() => {this.pencilIn()}} isComplete={this.state.isComplete} isPencil={this.state.isPencil}/>
                <Puzzle stopTimer={() => {this.stopTimer()}} isPencil={this.state.isPencil}/>
            </div>
        );
    }
}

export default Layout;
