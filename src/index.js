import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import HabitPresenter from './habit_presenter.js';

import '@fortawesome/fontawesome-free/js/all.js';

const habitPresenter = new HabitPresenter([
  { id: 1, name: 'Reading', count: 0 },
  { id: 2, name: 'Running', count: 0 },
  { id: 3, name: 'Coding', count: 0 },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App presenter={habitPresenter} />
  </React.StrictMode>
);
