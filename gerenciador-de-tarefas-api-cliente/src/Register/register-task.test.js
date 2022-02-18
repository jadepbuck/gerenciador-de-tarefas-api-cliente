import React from 'react';
import ReactDOM from 'react-dom';
import RegisterTask from './register-task';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Register Task test', () => {

    it('must register a new task', async () => {
        const { getByTestId, findByTestId } = render(<RegisterTask />);
        fireEvent.change(getByTestId('txt-task'), { target: {  value: 'Test component' }});
        fireEvent.click(getByTestId('btn-register'));
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso');
        expect(modal).toHaveTextContent('Tarefa adiciona com sucesso.');
    });
});