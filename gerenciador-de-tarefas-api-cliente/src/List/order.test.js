import React from 'react';
import ReactDOM from 'react-dom';
import Order from './order';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('order test', () => {

    it('must renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Order
                orderAsc={false}
                orderDesc={false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should display default ordering', () => {
        const { getByTestId } = render(
            <Order
                orderAsc={false}
                orderDesc={false} />
        );
        expect(getByTestId('faSort')).not.toHaveClass('hidden');
        expect(getByTestId('faSortUp')).toHaveClass('hidden');
        expect(getByTestId('faSortDown')).toHaveClass('hidden');
    });

    it('should display ascending ordering', () => {
        const { getByTestId } = render(
            <Order
                orderAsc={true}
                orderDesc={false} />
        );
        expect(getByTestId('faSort')).toHaveClass('hidden');
        expect(getByTestId('faSortUp')).not.toHaveClass('hidden');
        expect(getByTestId('faSortDown')).toHaveClass('hidden');
    });

    it('should display descendant ordering', () => {
        const { getByTestId } = render(
            <Order
                orderAsc={false}
                orderDesc={true} />
        );
        expect(getByTestId('faSort')).toHaveClass('hidden');
        expect(getByTestId('faSortUp')).toHaveClass('hidden');
        expect(getByTestId('faSortDown')).not.toHaveClass('hidden');
    });
});