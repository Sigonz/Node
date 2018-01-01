const {MongoClient, ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id ='';

Tod.findById(id).then((todo)=>{
  if (!todo){
    return null;
  }
  return todo;
});

