const expect = require('expect');
const util = require('../../Util/util');

it('Should add two numbers',()=>{
    var res=util.add(10,32);
    expect(res).toBe(42);
})
it('Should square number',()=>{

    var res =util.square(8);
    expect(res).toBe(64);
})

it ('Should pass the test',()=>{
        expect({age:25,name:'Yousof'}).toEqual({age:25, name:'Yousof'});
});


it ('Should pass Async Add method call',(done)=>{
    util.asyncAdd(3,4,(sum)=>{
        expect(sum).toBe(7);
        done();
    })
});
it('Should pass Asyc Square method call',(done)=>{
    util.asyncSquare(2,(res)=>{
        expect(res).toBe(4);
        done();
    });
});