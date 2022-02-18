const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { listTaskById, listTasks, registerTask, updateTask, deleteTask, concludeTask } = require('./controllers/task-manager');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

//listar todas as tarefas - GET
app.get('/task-manager', listTasks);

//listar uma tarefa por id - GET
app.get('/task-manager/:id', listTaskById);

//cadastrar uma tarefa - POST
app.post('/task-manager', registerTask);

//atualizar uma tarefa - PUT
app.put('/task-manager/:id', updateTask);

//remover uma tarefa - DELETE
app.delete('/task-manager/:id', deleteTask);

//concluir uma tarefa - PUT
app.put('/task-manager/:id/conclude', concludeTask);


app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));