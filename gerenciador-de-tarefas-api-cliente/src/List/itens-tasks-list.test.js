import React from 'react';
import ReactDOM from 'react-dom';
import ItensTasksList from './itens-tasks-list';
import Task from '../Models/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('component test that displays a list item', () => {

    const taskName = 'Task';
    const task = new Task(1, taskName, false);
    const doneTask = new Task(2, taskName, true);

    it('must renders without errors', () => {
        const div= document.createElement('div');
        ReactDOM.render(<ItensTasksList
            tasks={[]}
            reloadTasks={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('must show the task', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensTasksList
                        tasks={[task]}
                        reloadTasks={() => false} />
                </tbody>
            </table>
        );
        expect(getByTestId('task')).toHaveTextContent(taskName);
    });

    it('must show the done task', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensTasksList
                        tasks={[doneTask]}
                        reloadTasks={() => false} />
                </tbody>
            </table>
        );
        expect(getByTestId('task-name')).toHaveStyle('text-decoration: line-through');
    });
});