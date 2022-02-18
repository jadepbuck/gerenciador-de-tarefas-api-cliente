import React from 'react';
import ReactDOM from 'react-dom';
import ListPagination from './list-pagination';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('pagination component test', () => {

    it('must renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <ListPagination 
            totalItems={10}
            itemsPerPage={10}
            currentPage={1}
            changePage={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('must show pagination with 3 pages', () => {
        const { getByTestId } = render(
            <ListPagination
                totalItems={15}
                itemsPerPage={5}
                currentPage={1}
                changePage={() => false} />
        );
        const pagination = getByTestId('pagination');
        expect(pagination).toHaveTextContent('1');
        expect(pagination).toHaveTextContent('2');
        expect(pagination).toHaveTextContent('3');
    });
});