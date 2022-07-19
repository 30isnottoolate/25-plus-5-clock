import React from 'react';
import ReactDOM from 'react-dom/client';
import './app_styles.css';

class TwentyFivePlusFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      breakLeft: 300,
      sessionLeft: 1500,
      mode: "Session",
      active: false,
      ping: ""
    };
  }
  
  render() {
    return (
      <div id="app-container">
        <p id="app-name">25 + 5 CLOCK</p>

        <p id="session-label" className="length-label">Session Length</p>
        <button id="session-decrement" className="length-button">-</button>
        <button id="session-increment" className="length-button">+</button>
        <p id="session-length" className="length-counter">25</p>

        <p id="break-label" className="length-label">Break Length</p>
        <button id="break-decrement" className="length-button">-</button>
        <button id="break-increment" className="length-button">+</button>
        <p id="break-length" className="length-counter">5</p>

        <p id="timer-label">SESSION/BREAK</p>
        <p id="time-left">25:00</p>
        <button id="start_stop" className="time-button">START</button>
        <button id="reset" className="time-button">RESET</button>
        
        <audio id="alarm" preload="auto" ref={this.beep} src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/212[kb]oscillating-flyby.wav.mp3"/>
      </div>
    );
  }
}

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(<TwentyFivePlusFive/>);
