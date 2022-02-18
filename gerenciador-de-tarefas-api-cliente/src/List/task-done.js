import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function TaskDone(props) {

    const API_URL_TASK_DONE = 'http://localhost:3001/task-manager/:id/conclude';

    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    function handleOpenModal (event) {
        event.preventDefault();
        setShowModal(true);
    }

    function handleCloseModal () {
        setShowModal(false);
    }

    function handleCloseErrorModal() {
        setShowErrorModal(false);
    }

    async function handleDoneTask (event) {
        event.preventDefault();

        try {
            await axios.put(API_URL_TASK_DONE.replace(':id', props.task.id));
            setShowModal(false);
            props.reloadTasks(true);

        } catch(err) {
            setShowModal(false);
            setShowErrorModal(true);
        }
    }

    return (
        <span className={props.className}>
            <Button className='btn-sm' 
                onClick={handleOpenModal} 
                data-testid='btn-open-modal'>
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}
                data-testid='modal'>

                <Modal.Header closeButton>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja realmente concluir a tarefa:
                    <br/>
                    <strong>{props.task.name}</strong>?
                    <br/>
                    Ação não poderá ser revertida.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' onClick={handleDoneTask}
                        data-testid='btn-done-task'>
                        Sim
                    </Button>
                    <Button variant='light' onClick={handleCloseModal}
                        data-testid='btn-close-modal'>
                        Cancelar
                    </Button>
                </Modal.Footer>

            </Modal>

            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao finalizar tarefa. Tente novamente.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='warning' onClick={handleCloseErrorModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </span>
    );
}

TaskDone.propTypes = {
    task: PropTypes.object.isRequired,
    reloadTasks: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default TaskDone;