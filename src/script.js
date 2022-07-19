import React from 'react';
import ReactDOM from 'react-dom/client';
import './app_styles.css';

const DEF_B_LENGTH = 5; // default Break Length in minutes
const DEF_S_LENGTH = 25; // default Session Length in minutes
const DEF_B_LEFT = 300; // default Break length in seconds
const DEF_S_LEFT = 1500; // default Session length in seconds
const DEF_MODE = "Session"; // default mode
const DEF_ACTIVE = false; // default activity status

class TwentyFivePlusFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: DEF_B_LENGTH,
      sessionLength: DEF_S_LENGTH,
      breakLeft: DEF_B_LEFT,
      sessionLeft: DEF_S_LEFT,
      mode: DEF_MODE,
      active: DEF_ACTIVE,
      ping: ""
    };

    this.alarm = React.createRef();

    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      breakLength: DEF_B_LENGTH,
      sessionLength: DEF_S_LENGTH,
      breakLeft: DEF_B_LEFT,
      sessionLeft: DEF_S_LEFT,
      mode: DEF_MODE,
      active: DEF_ACTIVE,
      ping: ""
    });
  }

  render() {
    return (
      <div id="app-container">
        <p id="app-name">25 + 5 CLOCK</p>

        <p id="session-label" className="length-label">Session Length</p>
        <button id="session-decrement" className="length-button">-</button>
        <button id="session-increment" className="length-button">+</button>
        <p id="session-length" className="length-counter">{this.state.sessionLength}</p>

        <p id="break-label" className="length-label">Break Length</p>
        <button id="break-decrement" className="length-button">-</button>
        <button id="break-increment" className="length-button">+</button>
        <p id="break-length" className="length-counter">{this.state.breakLength}</p>

        <p id="timer-label">SESSION/BREAK</p>
        <p id="time-left">25:00</p>
        <button id="start_stop" className="time-button">START</button>
        <button id="reset" className="time-button" onClick={this.resetState}>RESET</button>
        
        <audio id="alarm" preload="auto" ref={this.alarm} src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/212[kb]oscillating-flyby.wav.mp3"/>
      </div>
    );
  }
}

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(<TwentyFivePlusFive/>);
