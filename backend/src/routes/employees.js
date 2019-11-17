const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const path = require('path');

//libreria que provee cloudinary para enviar las fotos a su servidor
const cloudinary = require('cloudinary');

//libreria para manipular las fotos en el servidor
const multer = require('multer');
const uuid = require('uuid/v4');

//configurando en entorno de cloudinary
cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET
});

//libreria para eliminar las fotos del servidor
const fs = require('fs-extra');

//configurando el middleware multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
      console.log(file);
      cb(null, uuid() + path.extname(file.originalname));
  }
})
const upload = multer({storage: storage});

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

// INSERT An Employee
router.post('/', (req, res) => {
    const {id, name, salary} = req.body;
    console.log(id, name, salary);
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employeed Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  router.put('/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL employeeAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Employee Updated'});
      } else {
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

router.post('/image', upload.single('image'),async (req, res) => {
  const {nombre} = req.body;
  const imgPath = req.file.path;
  const image = await cloudinary.v2.uploader.upload(imgPath);
  await mysqlConnection.query('insert into images (id, nombre, url) values(?,?,?)', [image.public_id, nombre, image.secure_url], async (err, rows, fields) => {
    if(!err) {
      await fs.unlink(imgPath);
      res.json({status: 'img saved'});
    } else {
      res.json({status: 'err'});
    }
  });

  // cloudinary.v2.uploader.destroy(public_id);

});

module.exports = router;