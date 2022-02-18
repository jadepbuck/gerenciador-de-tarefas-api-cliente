const uuidv4 = require('uuid/v4');

let tasks = [
    { id: '1', name: 'Estudar React', done: true },
    { id: '2', name: 'Aprender Java', done: false },
    { id: '3', name: 'Estudar Sql', done: false },
    { id: '4', name: 'Estudar alemão', done: false }
];

function listTaskById(req, res) {
    const id = req.params.id;
    const task = tasks.filter(task => task.id === id);
    if (task.length === 0) {
        res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(task[0]);
}

function listTasks(req, res) {
    const page = req.query['pag'] || 1;
    const order = req.query['order'];
    const filterTask = req.query['filter-task'];
    const itemsPerPage = req.query['items-per-page'] || 3;
    let returnTasks = tasks.slice(0);

    //filtrar dados
    if (filterTask) {
        returnTasks = returnTasks.filter(
            t => t.name.toLowerCase().indexOf(filterTask.toLowerCase()) === 0);
    }

    //ordenar dados
    if (order === 'ASC') {
        returnTasks.sort((t1, t2) => (t1.name.toLowerCase() > t2.name.toLowerCase()) ? 1 : -1);
    } else if (order === 'ESC') {
        returnTasks.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase()) ? 1 : -1);
    }

    //retornar dados
    res.json({
        totalItems: returnTasks.length,
        tasks: returnTasks.slice(0).splice((page - 1) * itemsPerPage, itemsPerPage),
        page: page
    });
}

function registerTask(req, res) {
    if (!req.body['name'] && !req.body['done']) {
        res.status(400).json({ error: 'Requisição inválida.' });
    }
    const task = {
        id: uuidv4(),
        name: req.body['name'],
        done: req.body['done']
    };
    tasks.push(task);
    res.json(task);
}

function updateTask(req, res) {
    if (!req.body['name'] && !req.body['done']) {
        res.status(400).json({ error: 'Requisição inválida.' });
    }

    const id = req.params.id;
    let taskUpdated = false;
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.name = req.body['name'];
            task.done = req.body['done'];
            taskUpdated = true;
        }
        return task;
    });
    if (!taskUpdated) {
        res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json({
        id: id,
        name: req.body['name'],
        done: req.body['done']
    });
}

function deleteTask(req, res) {
    const id = req.params.id;
    const numTasks = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (numTasks === tasks.length) {
        res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json({ msg: 'Tarefa excluída.' });
}

function concludeTask(req, res) {
    const id = req.params.id;
    let taskDone = false;
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.done = true;
            taskDone = true;
        }
        return task;
    });
    if (!taskDone) {
        res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json({ msg: 'Tarefa concluída.' });
}

module.exports = {
    listTaskById,
    listTasks,
    registerTask,
    updateTask,
    deleteTask,
    concludeTask
}