const required = require('../src/index.js')
const expect = require('chai')
  .expect
const http = require('node-mocks-http')


const requiredFields = ['email', 'password']

const incompleteReq = http.createRequest({
  body: {
    name: "A name",
    email: "some@mail.com",
  }
})

const completeReq = http.createRequest({
  body: {
    email: "some@mail.com",
    password: "asdasdsa"
  }
})

const failIfNext = fn => () => fn('failed test');

var res;



describe('test middleware', () => {

  beforeEach(done => {
    res = http.createResponse({
      eventEmitter: require('events')
        .EventEmitter
    })
    done()
  })

  it('should fail with custom message and code', done => {
    res.on('end', () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code)
        .to.equal(300);
      expect(body.message)
        .to.equal('You failed');
      done()
    })
    required(requiredFields, {
      error_status: 300,
      message: "You failed"
    })(incompleteReq, res, failIfNext(done))
  })

  it('should fail with defaults', done => {
    res.on('end', () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code)
        .to.equal(400);
      expect(body.message)
        .to.equal('Bad Request');
      expect(body.required)
        .to.equal(requiredFields.join(', '));
      expect(body.received)
        .to.equal('email');

      done()
    })
    required(requiredFields)(incompleteReq, res, failIfNext(done))
  })

  it('should succeed', done => {
    res.on('end', () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code)
        .to.equal(400);
      expect(body.message)
        .to.equal('Bad Request');
      done("failed test");
    })
    required(requiredFields)(completeReq, res, done)
  })

})
