const express = require('express')
const app = express();
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser');

//load in the mongoose modals
/* const { Users } = require('.db/modals/usersmodal');
 const { Task } = require('.db/modals/taskmodal');*/
const { Users, Task } = require('./db/modals');


//load middleware
app.use(bodyParser.json());


//Routes handler

//Users Rautes

/* Get users
purpose:get all Users
*/
app.get('/users', (req, res) => {
    //we want to return an array of all the Users in the database
    Users.find({}).then((Users) => {
        res.send(Users);
    })
})
/*Post /users
purpose:create a Users
*/
app.post('/users', (req, res) => {
    //we want to create a new User and return new User document back to the user(which include the id)
    //the Users information (fields) will be passed in via the json request body

    let name = req.body.Username;
    let Passwords = req.body.Password;
    let emails = req.body.Email;
    let newUsers = new Users({
        Username: name,
        Password: Passwords,
        Email: emails
    })
    newUsers.save().then((listDoc) => {
        res.send(listDoc);
    })
})
/* Patch  /users/:id
purpose:upadate specified User
*/
app.patch('/users/:id', (req, res) => {
    //we want to update  the specified user (User document with id in the URL)with new values specified in the json body of the request
    Users.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})
/*Delete /users/:id
purpose:delete specified user
*/
app.delete('/users/:id', (req, res) => {
    //we want to delete  the specified user (user document with id in the URL)
    Users.findOneAndRemove({
        _id: req.params.id
    }).then((removedUsersDoc) => {
        res.send(removedUsersDoc);
    });
})
//for Task Rautes

/*Get /users/:usersID/tasks
  Purpose:Get all tasks in a specified user*/

app.get('/users/:usersId/tasks', (req, res) => {
    //We want to retrun all tasks that belongs to a specific user(specified by userID)
    Task.find({
        _usersId: req.params.usersId
    }).then((tasks) => {
        res.send(tasks);
    })
})
/*Post /users/:usersID/tasks
  Purpose:Create a new  tasks in a specified user
*/

app.post('/users/:usersId/tasks', (req, res) => {
    //We want to create new  tasks in  a user specific by userId
    let newtask = new Task({
        title: req.body.title,
        Description: req.body.Description,
        completed: req.body.completed,
        _usersId: req.params.usersId
    })
    newtask.save().then((newtaskDoc) => {
        res.send(newtaskDoc)
    })
})
/*
Patch /users/:userId/tasks/:tasksId
purpose:Update an existing task
*/
app.patch('/users/:usersId/tasks/:taskId', (req, res) => {
    //we want to update an existing task (specified by taskId)
    Task.findByIdAndUpdate({
        _id: req.params.taskId,
        _usersId: req.params.usersId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})
/*
Delete /users/:userId/tasks/:tasksId
purpose:Delete an existing task
*/
app.delete('/users/:usersId/tasks/:taskId', (req, res) => {
    //we want to delete an existing task (specified by taskId)
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _usersId: req.params.usersId
    }).then((removedtasksDoc) => {
        res.send(removedtasksDoc);
    });
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})