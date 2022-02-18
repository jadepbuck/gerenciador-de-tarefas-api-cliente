import React from 'react';
import ReactDOM from 'react-dom';
import RemoveTask from './remove-task';
import Task from '../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('component remove test', () => {

    const taskName = 'TaskName test';
    const task = new Task(1, taskName, false);

    it('must show the modal', () => {
        const { getByTestId } = render(
            <RemoveTask
                task={task}
                reloadTasks={() => false} />
        );
        fireEvent.click(getByTestId('btn-open-modal'));
        expect(getByTestId('modal')).toHaveTextContent(taskName);
    });

    it('must remove a task', async () => {
        const { getByTestId, findByTestId } = render(
            <RemoveTask
                task={task}
                reloadTasks={() => false} />
        );
        fireEvent.click(getByTestId('btn-open-modal'));
        fireEvent.click(getByTestId('btn-remove'));
        await findByTestId('modal');
        expect(axiosMock.delete).toHaveBeenCalledTimes(1);
    });
});