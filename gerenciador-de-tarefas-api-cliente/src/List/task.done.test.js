import React from 'react';
import ReactDOM from 'react-dom';
import TaskDone from './task-done';
import Task from '../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('component test that displays done tasks', () => {

    const taskName = 'TaskTest';
    const task = new Task(1, taskName, false);

    it('must show modal', () => {
        const { getByTestId } = render(
            <TaskDone
            task={task}
            reloadTasks={() => false} />
        );
        fireEvent.click(getByTestId('btn-open-modal'));
        expect(getByTestId('modal')).toHaveTextContent(taskName);
    });

    it('must complete a task', async () => {
        
        const { getByTestId, findByTestId } = render (
            <TaskDone
                task={task}
                reloadTasks={() => false} />
        );
        fireEvent.click(getByTestId('btn-open-modal'));
        fireEvent.click(getByTestId('btn-done-task'));
        await findByTestId('modal');
        expect(axiosMock.put).toHaveBeenCalledTimes(1);
    });
});