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


//DELETE



module.exports = taskRouter;