const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('quete', { title: 'Formulaire' });
});

router.post('/', upload.array('monfichier', 3), function(req, res, next) {
  let errorArray = [];
  let fileArray = req.files;

  fileArray.forEach(file => {
    fs.rename(file.path, 'public/images/' + file.originalname, function(err) {
      if (err) {
        errorArray.push({ name: item.originalname, err: err });
      }
    });

    if (errorArray.length >= 1) {
      res.send(
        `Il y a eu des erreurs: ${errorArray.forEach(
          item => item.name + `:` + item.err
        )}}`
      );
    } else {
      res.send('Fichiers envoyés !');
    }
  });
});

module.exports = router;
