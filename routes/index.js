const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/pdfcontroller');
const path = require('path')

router.get('/', exampleController.index);

router.post('/generatepdf', exampleController.generatepdf)

router.get('/scripts/pdfs/:filename', function(req, res) {
    var options = {
      root: path.join(__dirname, '../scripts/pdfs/'),
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
    var fileName = req.params.filename;
    res.sendFile(fileName, options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent:', fileName);
      }
    });
  });
  

module.exports = router;
