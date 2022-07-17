import React from 'react';
import ReactDOM from 'react-dom/client';
import './app_styles.css';

class TwentyFivePlusFive extends React.Component {
  render() {
    return (
      <div id="app">
        <p>Time!</p>
      </div>
    );
  }
}

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(<TwentyFivePlusFive/>);
