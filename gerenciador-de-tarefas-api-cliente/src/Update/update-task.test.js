import React from 'react';
import ReactDOM from 'react-dom';
import UpdateTask from './update-task';
import Task from '../Models/task.model';
import {  render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('UpdateTask test', () => {

    const taskId = 1;

    it('should shows success modal', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: { name: 'Estudar React' }});
        const { findByTestId } = render(<UpdateTask id={taskId}/>);
        fireEvent.click(await findByTestId('btn-update'));
        const modal = await(findByTestId('modal'));
        expect(modal).toHaveTextContent('Atualização');
    });

});
