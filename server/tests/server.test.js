const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
  _id:new ObjectID(),
  text:'Todo number 1'
},{
    _id:new ObjectID(),
  text:'Todo number 2'
}];


beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(()=>{
      done();
    })
  });
});


describe('POST /todos',()=>{
it ('Should create a new todo',(done)=>{


  var text ='This text comes from test';
  request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      }).end((err,res)=>{
        if (err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((err)=>{
          done(err);
        });
  });
});

it ('Should not create todo',(done)=>{

  request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if (err){
          return done(err);
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      });



});
});

describe('GET todo',()=>{
  it ('Should return todo by Id',(done)=>{
    //console.log(`${todos[0]._id.toHexString()}`);
    request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
});
  it ('Should return 404',(done)=> {

      request(app)
          .get('/todos/5a4a7c34265aaeb6472b50d6')
          .expect(404)
          .end(done);
  });

  it ('should return 404 cause id is not valid ObjectID',(done)=>{
    request(app)
        .get('/todos/12334')
        .expect(404)
        .end(done);
  });
});

