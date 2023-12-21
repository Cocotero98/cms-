var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
      .then((sequence) => { 
        // console.log(sequence);
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    })
    .catch((err)=>{
      console.log(err);
      return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
    });      
    };


SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
  .then((result) => {
        console.log("success sequence");
        return null
    })
    .catch((err)=>{
      console.log("nextId error = " + JSON.stringify(err));
        return null
    })
    

  return nextId;
}

module.exports = new SequenceGenerator();
