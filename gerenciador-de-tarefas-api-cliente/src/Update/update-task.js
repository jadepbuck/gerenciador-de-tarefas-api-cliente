import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import axios from 'axios';
import Task from '../Models/task.model';

function UpdateTask(props) {

    const API_URL_TASKS = 'http://localhost:3001/task-manager/';

    const [showModal, setShowModal] = useState(false);
    const [formValidated, setFormValidated] = useState(false);
    const [task, setTask] = useState('');
    const [loadTask, setLoadTask] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {

        async function getTask() {
            try {
                let { data } = await axios.get(API_URL_TASKS + props.id);
                setTask(data.name);

            } catch(err) {
                navigate('/');
            }
        }

        if (loadTask) {
            getTask();
            setLoadTask(false);
        }
    }, [loadTask, props]);

    function back(event) {
        event.preventDefault();
        navigate('/');
    }

    function handleCloseModal() {
        navigate('/');
    }

    function handleCloseErrorModal(){
        setShowErrorModal(false);
    }

    async function update(event) {
        event.preventDefault();
        setFormValidated(true);
        
        if (event.currentTarget.checkValidity() === true) {
            try {
                const updateTask = new Task(null, task, false);
                await axios.put(API_URL_TASKS + props.id, updateTask);
                setShowModal(true);
            } catch(err) {
                setShowErrorModal(true);
            }
            
        }
    }

    function handleTxtTask(event) {
        setTask(event.target.value);
    }

    return (
        <div>
            <h3 className='text-center'>Atualizar</h3>
            <Jumbotron>
                <Form onSubmit={update} noValidate validated={formValidated}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite a tarefa'
                            minLength='5'
                            maxLength='100'
                            required
                            data-testid='txt-task'
                            value={task}
                            onChange={handleTxtTask} />
                        <Form.Control.Feedback type='invalid'>
                            A tarefa deve conter ao menos 5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='text-center'>
                        <Button variant='success' type='submit' data-testid='btn-update'>
                            Atualizar
                        </Button>
                        &nbsp;
                        < A href='/' className='btn btn-light' onClick={back} >
                            Voltar
                        </A>

                    </Form.Group>
                </Form>

                <Modal show={showModal} onHide={handleCloseModal} data-testid='modal'>
                    <Modal.Header closeButton>
                        <Modal.Title>Atualização</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa atualizada com sucesso.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' onClick={handleCloseModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                        <Modal.Body>
                            Erro ao atualizar tarefa. Tente novamente.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='warning' onClick={handleCloseErrorModal}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
            </Jumbotron>
        </div>
    );
}

UpdateTask.propTypes = {
    id: PropTypes.number.isRequired
}

export default UpdateTask;