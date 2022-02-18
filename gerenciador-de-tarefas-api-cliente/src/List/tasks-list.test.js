import React from 'react';
import ReactDOM from 'react-dom';
import TasksList from './tasks-list';
import Task from '../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('TaskList test', () => {

    const firstTaskName = 'First Task';
    const secondTaskName = 'Second Task';
    const thirdTaskName = 'Third Task';

    const tasksList = {
        totalItems: 3,
        tasks: [
            new Task(1, firstTaskName, false),
            new Task(2, secondTaskName, false),
            new Task(3, thirdTaskName, false)
        ],
        page: 1
    };

    it('renders a table with 3 tasks', async () => {

        axiosMock.get.mockResolvedValueOnce({ data: tasksList });

        const { findByTestId } = render(<TasksList />);
        const table = await findByTestId('table');

        expect(table).toHaveTextContent(firstTaskName);
        expect(table).toHaveTextContent(secondTaskName);
        expect(table).toHaveTextContent(thirdTaskName);
    });

    it('must filter task table data', async () => {

        axiosMock.get.mockResolvedValueOnce({ data: tasksList });
        axiosMock.get.mockResolvedValueOnce({ data: {
            totalItems: 1,
            tasks: [new Task(1, firstTaskName, false)],
            page: 1
        }});

        const { findByTestId } = render(<TasksList />);
        fireEvent.change(await findByTestId('txt-task'), { target: { value: firstTaskName }});
        const table = await findByTestId('table');

        expect(table).toHaveTextContent(firstTaskName);
        expect(table).not.toHaveTextContent(secondTaskName);
        expect(table).not.toHaveTextContent(thirdTaskName);
    });
});