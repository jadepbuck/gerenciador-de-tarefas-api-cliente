import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensTasksList from './itens-tasks-list';
import ListPagination from './list-pagination';
import Order from './order';
import axios from 'axios';

function TasksList() {

    const ITEMS_PER_PAGE = 3;
    const API_URL_TASKS_LIST = 'http://localhost:3001/task-manager';


    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(false);
    const [taskFilter, setTaskFilter] = useState('');

    useEffect(() => {
        //async: executa método de forma assíncrona 
        // await: aguarda finalização e retorno da API

        async function getTasks() {
            //order
            let order = '';

            if (orderAsc) {
                order = 'ASC';
            } else if (orderDesc) {
                order = 'DESC';
            }

            try {
                const params = `?pag=${currentPage}&order=${order}&filter-task=${taskFilter}`;
                let { data } = await axios.get(API_URL_TASKS_LIST + params);
                setTotalItems(data.totalItems);
                setTasks(data.tasks);
            } catch(err) {
                setTasks([]);
            }
        }

        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }

    }, [loadTasks, currentPage, orderAsc, orderDesc, taskFilter]);

    function handleChangePage(page) {
        setCurrentPage(page);
        setLoadTasks(true);
    }

    function handleOrder(event) {
        event.preventDefault();
        if (!orderAsc && !orderDesc) {
            setOrderAsc(true);
            setOrderDesc(false);
        } else if (orderAsc) {
            setOrderAsc(false);
            setOrderDesc(true);
        } else {
            setOrderAsc(false);
            setOrderDesc(false);
        }
        setLoadTasks(true);
    }

    function handleFilter(event) {
        setTaskFilter(event.target.value);
        setLoadTasks(true);
    }

    return (
        <div className='text-center'>
            <h3>Lista de Tarefas</h3>
            <Table striped bordered hover responsive data-testid='table'>
                <thead>
                    <tr>
                        <th>
                            <a href='/' onClick={handleOrder}>
                                Tarefa
                                &nbsp;
                                <Order
                                    orderAsc={orderAsc}
                                    orderDesc={orderDesc} />
                            </a>
                        </th>
                        <th>
                            <A href='/cadastrar'
                                className='btn btn-success btn-sm'
                                data-testid='btn-nova-tarefa'>
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;
                                Nova Tarefa
                            </A>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Form.Control
                                type='text'
                                value={taskFilter}
                                onChange={handleFilter}
                                data-testid='txt-task'
                                className='filter-task' />
                        </th>
                        <th>
                            &nbsp;
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <ItensTasksList
                    tasks={tasks}
                    reloadTasks={setLoadTasks} />
                </tbody>
            </Table>
            <ListPagination
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                changePage={handleChangePage} />
        </div>
    );
}

export default TasksList;