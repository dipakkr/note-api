var router = require('express').Router();

var notes = require('../controllers/note.controller.js');

router.post('/notes',notes.create);
router.get('/notes', notes.findAll);


module.exports = router;
