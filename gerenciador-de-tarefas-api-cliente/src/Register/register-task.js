import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Task from '../Models/task.model';
import axios from 'axios';

function RegisterTask() {

    const API_URL_REGISTER_TASK = 'http://localhost:3001/task-manager';

    const [task, setTask] = useState('');
    const [formValidated, setFormValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    async function register(event) {
        event.preventDefault();
        setFormValidated(true);

        if (event.currentTarget.checkValidity() === true) {
            try {
                const newTask = new Task(null, task, false);
                await axios.post(API_URL_REGISTER_TASK, newTask);
                setShowModal(true);
            } catch(err) {
                setShowErrorModal(true);
            }
        }
    }

    function handleTxtTask(event) {
        setTask(event.target.value);
    }

    function handleCloseModal() {
        navigate('/');
    }

    function handleCloseErrorModal() {
        setShowErrorModal(false);
    }

    return (
      <div>
        <h3 className='text-center'>Cadastrar</h3>
        <Jumbotron>

            <Form
                validated={formValidated}
                noValidate
                onSubmit={register}>

                <Form.Group>
                    <Form.Label>Tarefa</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Descreva a tarefa"
                        minLength="5"
                        maxLength="100"
                        required
                        value={task}
                        onChange={handleTxtTask}
                        data-testid="txt-task" />
                    <Form.Control.Feedback type="invalid">
                        A tarefa deve conter no mínimo 5 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="text-center">
                    <Button
                        variant="success"
                        type="submit"
                        data-testid="btn-register">
                        Cadastrar
                    </Button>
                    &nbsp;
                    <A href="/" className="btn btn-light">Voltar</A>
                </Form.Group>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tarefa adiciona com sucesso.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={handleCloseModal}>
                            Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={handleCloseErrorModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao adicionar tarefa, tente novamente.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='warning'
                        onClick={handleCloseErrorModal}>
                            Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </Jumbotron>
      </div>
    );
}

export default RegisterTask;