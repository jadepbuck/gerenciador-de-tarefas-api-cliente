import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Order(props) {

    function handleAscDesc() {
        return (props.orderAsc || props.orderDesc) ? 'hidden' : '';
    }

    function handleAsc() {
        return (props.orderAsc) ? '' : 'hidden';
    }

    function handleDesc() {
        return (props.orderDesc) ? '' : 'hidden';
    }

    return(
        <span>
            <FontAwesomeIcon
                icon={faSort}
                className={handleAscDesc()}
                data-testid='faSort' />

            <FontAwesomeIcon
                icon={faSortUp}
                className={handleAsc()}
                data-testid='faSortUp' />

            <FontAwesomeIcon
                icon={faSortDown}
                className={handleDesc()}
                data-testid='faSortDown' />
        </span>
    );
}

Order.propTypes = {
    orderAsc: PropTypes.bool.isRequired,
    orderDesc: PropTypes.bool.isRequired
}

export default Order;