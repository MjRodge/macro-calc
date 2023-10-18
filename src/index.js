import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

ReactDOM.render(<App />, document.getElementById('macro-calc-root'));
registerServiceWorker();
