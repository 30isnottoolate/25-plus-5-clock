import React from 'react';
import ReactDOM from 'react-dom/client';
import './app_styles.css';

const DEF_B_LENGTH = 5; // default Break Length in minutes
const DEF_S_LENGTH = 25; // default Session Length in minutes
const DEF_B_LEFT = 300; // default Break length in seconds
const DEF_S_LEFT = 1500; // default Session length in seconds
const DEF_MODE = "Session"; // default mode
const DEF_ACTIVE = false; // default activity status
const SECS_IN_A_MIN = 60; // number of seconds in a minute
const MIN_LENGTH = 1; // minimal length of modes
const MAX_LENGTH = 60; // maximal length of modes

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
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.convertClock = this.convertClock.bind(this);
    this.startPauseButtonLabel = this.startPauseButtonLabel.bind(this);
  }

  resetState() {
    this.alarm.current.pause();
    this.alarm.current.currentTime = 0;

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

  decrementBreak() {
    this.setState((prevState) => {
      if (!prevState.active && prevState.breakLength > MIN_LENGTH ) {
        return {
          breakLength: prevState.breakLength - 1,
          breakLeft: (prevState.breakLength - 1) * SECS_IN_A_MIN
        }
      }
    });
  }

  incrementBreak() {
    this.setState((prevState) => {
      if (!prevState.active && prevState.breakLength < MAX_LENGTH) {
        return {
          breakLength: prevState.breakLength + 1,
          breakLeft: (prevState.breakLength + 1) * SECS_IN_A_MIN
        }
      }
    });
  }

  decrementSession() {
    this.setState((prevState) => {
      if (!prevState.active && prevState.sessionLength > MIN_LENGTH ) {
        return {
          sessionLength: prevState.sessionLength - 1,
          sessionLeft: (prevState.sessionLength - 1) * SECS_IN_A_MIN
        }
      }
    });
  }
  
  incrementSession() {
    this.setState((prevState) => {
      if (!prevState.active && prevState.sessionLength < MAX_LENGTH) {
        return {
          sessionLength: prevState.sessionLength + 1,
          sessionLeft: (prevState.sessionLength + 1) * SECS_IN_A_MIN
        }
      }
    });
  }
  
  convertClock() {
    let minutes, seconds;
    
    if (this.state.mode == "Session") {
      minutes = Math.floor(this.state.sessionLeft / SECS_IN_A_MIN);
      seconds = this.state.sessionLeft % SECS_IN_A_MIN;
    } else {
      minutes = Math.floor(this.state.breakLeft / SECS_IN_A_MIN);
      seconds = this.state.breakLeft % SECS_IN_A_MIN;
    }
    
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}

    return minutes + ":" + seconds;
  }

  startPauseButtonLabel() {
    if (!this.state.active) {
      return "START";
    } else if (this.state.active) {
      return "PAUSE";
    }
  }

  decrementTime() {
    this.setState((prevState) => {
      if (prevState.mode == "Session") {
        if (prevState.sessionLeft > 0) {
          return {
            sessionLeft: prevState.sessionLeft - 1
          }
        } if (prevState.sessionLeft == 0) {
          this.beep.current.play();
          return {
            breakLeft: prevState.breakLength * SECS_IN_A_MIN,
            mode: "Break"
          }
        }
      } else {
        if (prevState.breakLeft > 0) {
          return {
            breakLeft: prevState.breakLeft - 1
          }
        } if (prevState.breakLeft == 0) {
          this.beep.current.play();
          return {
            sessionLeft: prevState.sessionLength * SECS_IN_A_MIN,
            mode: "Session"
          }
        }
      }
    });
  }

  render() {
    return (
      <div id="app-container">
        <p id="app-name">25 + 5 CLOCK</p>

        <p id="session-label" className="length-label">Session Length</p>
        <button id="session-decrement" className="length-button" onClick={this.decrementSession}>-</button>
        <button id="session-increment" className="length-button" onClick={this.incrementSession}>+</button>
        <p id="session-length" className="length-counter">{this.state.sessionLength}</p>

        <p id="break-label" className="length-label">Break Length</p>
        <button id="break-decrement" className="length-button" onClick={this.decrementBreak}>-</button>
        <button id="break-increment" className="length-button" onClick={this.incrementBreak}>+</button>
        <p id="break-length" className="length-counter">{this.state.breakLength}</p>

        <p id="timer-label">{this.state.mode}</p>
        <p id="time-left">{this.convertClock()}</p>
        <button id="start_stop" className="time-button">{this.startPauseButtonLabel()}</button>
        <button id="reset" className="time-button" onClick={this.resetState}>RESET</button>
        
        <audio id="alarm" preload="auto" ref={this.alarm} src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/212[kb]oscillating-flyby.wav.mp3"/>
      </div>
    );
  }
}

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(<TwentyFivePlusFive/>);
