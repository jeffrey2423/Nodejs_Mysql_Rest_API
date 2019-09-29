const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/', (req, res) =>{
    mysqlConnection.query('select * from employee', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('select * from employee where id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const {id, name, salary} = req.body;
    console.log(id, name, salary);
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query,[id,name,salary],(err,rows, fields) =>{
        if(!err){
            res.json({Status: 'Empleado guardado'});
        }else{
            console.log(err);
        }
    });
});
router.put('/:id', (req, res) => {
    const {id, name, salary} = req.body;
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query,[id,name,salary],(err,rows, fields) =>{
        if(!err){
            res.json({Status: 'Empleado Actualizado'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('delete from employee where id = ?', [id], (err,rows,fields) =>{
        if(!err){
            res.json({Status: 'Empleado eliminado'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;