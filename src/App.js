import React from 'react';
import Login from './pages/Login';
import Routes from './routes';
import './static/vendor/bootstrap/css/bootstrap.min.css';
import './static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './static/fonts/Linearicons-Free-v1.0.0/icon-font.min.css'
import './static/vendor/animate/animate.css';
import './static/vendor/css-hamburgers/hamburgers.min.css';
import './static/vendor/select2/select2.min.css';
import './static/css/util.css';
import './static/css/main.css';

function App() {
  return (
    <div className="App">
      {
        Routes()
      }
    </div>
  );
}

export default App;
