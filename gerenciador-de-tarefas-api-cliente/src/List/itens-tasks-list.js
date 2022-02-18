import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import TaskDone from './task-done';
import RemoveTask from './remove-task';

function ItensTasksList(props) {

    return(
        props.tasks.map(task =>
            <tr key={task.id} data-testid='task'>

                <td width='75%' 
                    data-testid='task-name' 
                    style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.name}
                </td>
                <td className='text-right'>
                    <TaskDone
                        task={task}
                        reloadTasks={props.reloadTasks}
                        className={task.done ? 'hidden' : null } />
                    &nbsp;
                    <A href={'/atualizar/' + task.id}
                        className={task.done ? 'hidden' : 'btn btn-warning btn-sm'}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </A>
                    &nbsp;
                    <RemoveTask
                        task={task}
                        reloadTasks={props.reloadTasks} />
                </td>

            </tr>
        )
    );
}

ItensTasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    reloadTasks: PropTypes.func.isRequired
};

export default ItensTasksList;