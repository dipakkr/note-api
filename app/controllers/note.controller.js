var Note = require('../models/note.model.js');

exports.create = function(req, res) {

    var note = new Note({ "title": req.body.title || "Untitled Note", "content": req.body.content});

    note.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });
    
    console.log("Post request Successfully");
};

exports.findAll = function (req,res) {
  // body...

  Note.find(function(err,notes){
    if(err){
      console.log(err);
      res.status(500).send({message : "Some error occured while retrieving notes"});
    }else {
      res.send(notes);
    }
  });

};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Note.find(function(err, notes){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(notes);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single note with a noteId
    Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});
            }
            return res.status(500).send({message: "Error retrieving note with id " + req.params.noteId});
        }

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteId});
        }

        res.send(note);
    });
};
