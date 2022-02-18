import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function RemoveTask(props) {

    const API_URL_REMOVE_TASK = 'http://localhost:3001/task-manager/';

    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    function handleOpenModal(event) {
        event.preventDefault();
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }
    
    function handleCloseErrorModal() {
        setShowErrorModal(false);
    }

    async function handleRemoveTask(event) {
        event.preventDefault();
        try{
            await axios.delete(API_URL_REMOVE_TASK + props.task.id);
            setShowModal(false);
            props.reloadTasks(true);

        } catch(err){
            setShowModal(false);
            setShowErrorModal(true);
        }

    }

    return(
        <span>
            <Button variant='danger' 
                className='btn-sm'
                onClick={handleOpenModal}
                data-testid='btn-open-modal'>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} data-testid='modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Remover Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a tarefa:
                    <br/>
                    <strong>{props.task.name}</strong>?
                    <br/>
                    Ação não poderá ser revertida.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary'
                    onClick={handleRemoveTask}
                    data-testid='btn-remove'>
                        Remover
                    </Button>
                    <Button variant='light'
                        onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                    <Modal.Body>
                        Erro ao remover tarefa.Tente novamente.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='warning' onClick={handleCloseErrorModal}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal.Header>
            </Modal>
        </span>
    );

}

RemoveTask.propTypes = {
    task: PropTypes.object.isRequired,
    reloadTasks: PropTypes.func
}

export default RemoveTask;