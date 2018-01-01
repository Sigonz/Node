const request = require ('supertest');
const expect = require ('expect');
const app = require('../../server/server').app;

it('Should pass Get', (done)=>{
       request(app)
           .get('/')
           .expect((res)=>{
               expect(res.body).toInclude({error:'Page Not Found!'});
           })
           .end(done);
});