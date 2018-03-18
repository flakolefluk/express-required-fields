const required = require("../src/index.js");
const expect = require("chai").expect;
const http = require("node-mocks-http");

const requiredFields = ["email", "password"];

const incompleteReq = {
  name: "A name",
  email: "some@mail.com"
};

const completeReq = {
  email: "some@mail.com",
  password: "asdasdsa"
};

const incompleteBodyReq = http.createRequest({
  body: incompleteReq
});

const completeBodyReq = http.createRequest({
  body: completeReq
});

const incompleteHeadersReq = http.createRequest({
  headers: incompleteReq
});

const completeHeadersReq = http.createRequest({
  headers: completeReq
});

const incompleteQueryReq = http.createRequest({
  query: incompleteReq
});

const completeQueryReq = http.createRequest({
  query: completeReq
});

const failIfNext = fn => () => fn("failed test");

var res;

describe("body", () => {
  beforeEach(done => {
    res = http.createResponse({
      eventEmitter: require("events").EventEmitter
    });
    done();
  });

  it("should fail with custom message and code", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(300);
      expect(body.message).to.equal("You failed");
      done();
    });
    required(requiredFields, {
      error_status: 300,
      message: "You failed"
    })(incompleteBodyReq, res, failIfNext(done));
  });

  it("should fail with defaults", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      expect(body.required).to.equal(requiredFields.join(", "));
      expect(body.received).to.equal("email");

      done();
    });
    required(requiredFields)(incompleteBodyReq, res, failIfNext(done));
  });

  it("should succeed", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      done("failed test");
    });
    required(requiredFields)(completeBodyReq, res, done);
  });
});

describe("headers", () => {
  beforeEach(done => {
    res = http.createResponse({
      eventEmitter: require("events").EventEmitter
    });
    done();
  });

  it("should fail with custom message and code", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(300);
      expect(body.message).to.equal("You failed");
      done();
    });
    required(requiredFields, {
      accept_headers: true,
      error_status: 300,
      message: "You failed"
    })(incompleteHeadersReq, res, failIfNext(done));
  });

  it("should fail with defaults", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      expect(body.required).to.equal(requiredFields.join(", "));
      expect(body.received).to.equal("email");

      done();
    });
    required(requiredFields, { accept_headers: true })(
      incompleteHeadersReq,
      res,
      failIfNext(done)
    );
  });

  it("should succeed", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      done("failed test");
    });
    required(requiredFields, { accept_headers: true })(
      completeHeadersReq,
      res,
      done
    );
  });

  it("should fail if accept headers is not set", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      expect(body.required).to.equal(requiredFields.join(", "));
      expect(body.received).to.equal("");
      done();
    });
    required(requiredFields)(completeHeadersReq, res, failIfNext(done));
  });
});

describe("query", () => {
  beforeEach(done => {
    res = http.createResponse({
      eventEmitter: require("events").EventEmitter
    });
    done();
  });

  it("should fail with custom message and code", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(300);
      expect(body.message).to.equal("You failed");
      done();
    });
    required(requiredFields, {
      accept_query: true,
      error_status: 300,
      message: "You failed"
    })(incompleteQueryReq, res, failIfNext(done));
  });

  it("should fail with defaults", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      expect(body.required).to.equal(requiredFields.join(", "));
      expect(body.received).to.equal("email");

      done();
    });
    required(requiredFields, { accept_query: true })(
      incompleteQueryReq,
      res,
      failIfNext(done)
    );
  });

  it("should succeed", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      done("failed test");
    });
    required(requiredFields, { accept_query: true })(
      completeQueryReq,
      res,
      done
    );
  });

  it("should fail if accept query is not set", done => {
    res.on("end", () => {
      let code = res._getStatusCode();
      let body = JSON.parse(res._getData());
      expect(code).to.equal(400);
      expect(body.message).to.equal("Bad Request");
      expect(body.required).to.equal(requiredFields.join(", "));
      expect(body.received).to.equal("");
      done();
    });
    required(requiredFields)(completeQueryReq, res, failIfNext(done));
  });
});
