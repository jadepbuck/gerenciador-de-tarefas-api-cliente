import React from 'react';
import ReactDOM from 'react-dom';
import TaskManager from './task-manager';

test.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});
