const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const mock = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
]

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).type('application/json').send({status : 'ok'}));

app.get('/api/TodoItems', (req, res) => res.status(200).send(mock));
app.post('/api/TodoItems', (req, res) => {
    const todo = req.body;
    if(mock.filter(item => item.todoItemId === todo.todoItemId)) {
        mock.splice(todo.todoItemId, 1, todo);
    } else {
        mock.push(todo)
    }
    res.status(201).send(todo);
});

app.get('/api/TodoItems/:number', (req, res) => {
    const todo = mock.find(item => item.todoItemId == req.params.number)
    res.status(200).send(todo);
});
app.delete('/api/TodoItems/:number', (req, res) => {
    const deletedItem = mock.splice(req.params.number, 1);
    res.status(200).send(deletedItem[0]);
})

module.exports = app;