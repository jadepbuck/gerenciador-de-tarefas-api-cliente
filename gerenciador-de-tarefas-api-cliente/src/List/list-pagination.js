import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

function ListPagination(props) {

    function createFirstItem() {
        return(
            <Pagination.First
                key='firstPag'
                onClick={() => props.changePage(1)}
                disabled={props.currentPage === 1} />
        );
    }

    function createPreviousItem() {
        return(
            <Pagination.Prev
                key='previousPage'
                onClick={() => props.changePage(props.currentPage - 1)}
                disabled={props.currentPage === 1} />
        );
    }

    function createNumberItem(page) {
        return(
            <Pagination.Item
                key={page}
                active={page === props.currentPage}
                onClick={() => props.changePage(page)}>
                {page}
            </Pagination.Item>
        );
    }

    function createNextItem(numPag) {
        return(
            <Pagination.Next
                key='nextPage'
                onClick={() => props.changePage(props.currentPage + 1)}
                disabled={props.currentPage === numPag} />
        );
    }

    function createLastItem(numPag) {
        return (
            <Pagination.Last
                key='lastPage'
                onClick={() => props.changePage(numPag)}
                disabled={props.currentPage === numPag} />
        );
    }

    function getPagination() {
        const numPag = Math.ceil(props.totalItems / props.itemsPerPage);
        let items = [];
        items.push(createFirstItem());
        items.push(createPreviousItem());

        for (let page = 1; page <= numPag; page++) {
            items.push(createNumberItem(page));
        }
        items.push(createNextItem(numPag));
        items.push(createLastItem(numPag));
        return items;
    }

    return(
        <Pagination data-testid='pagination'>
            {getPagination()}
        </Pagination>
    );

}

ListPagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default ListPagination;