import React from 'react';
import './task-manager.css';
import { useRoutes } from 'hookrouter';
import TasksList from './List/tasks-list';
import RegisterTask from './Register/register-task';
import UpdateTask from './Update/update-task';

const routes = {
  '/': () => <TasksList />,
  '/cadastrar': () => <RegisterTask />,
  '/atualizar/:id': ({id}) => <UpdateTask id={id} />
};

function TaskManager() {
  return useRoutes(routes);
}

export default TaskManager;
