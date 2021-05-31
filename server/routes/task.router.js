const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool');

//GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "date";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks in router.get', error);
        res.sendStatus(500);
    });
});//end router.get

//POST
taskRouter.post('/', (req, res) => {
    console.log(req.body);

  let queryText = `INSERT INTO "tasks" 
	("task", "date", "complete") 
    VALUES 
        ($1, $2, $3)`
 
 pool.query(queryText, [req.body.task, req.body.date, req.body.complete])
 .then ((result) => {
     res.sendStatus(201);
     
 }).catch(err => {
     console.log(err);
     
     res.sendStatus(500);
 })
 });//end post


//PUT
taskRouter.put('/:id', (req, res) => {
    let taskId = req.params.id;//setting task id dynamically
    console.log('taskId in taskRouter', taskId);
    
    let completedTask = req.body.complete
    console.log(req.body);
    console.log(completedTask);
    let queryString = '';
    
    if (completedTask === 'true'){//SQL statement to update if task is complete
        queryString = `UPDATE "tasks" SET "complete"=true WHERE "tasks".id=$1;`;
        console.log('in taskrouterPUT, queryString is', queryString);  
    } else {
        queryString = `UPDATE "tasks" SET "complete"=false WHERE "tasks".id=$1;`;
    }
        
    pool.query(queryString, [taskId])
        .then(response => {
            console.log(response.rowCount);
            res.sendStatus(202);//sends info to SQL DB for update and sends back 202
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);//if it doesn't work get 500
        });
});//end put

//DELETE



module.exports = taskRouter;