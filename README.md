# express-required-fields

[![Greenkeeper badge](https://badges.greenkeeper.io/flakolefluk/express-required-fields.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/express-required-fields.svg)](https://badge.fury.io/js/express-required-fields) [![Build Status](https://travis-ci.org/flakolefluk/express-required-fields.svg?branch=master)](https://travis-ci.org/flakolefluk/express-required-fields)

## Synopsis

Express middleware to set required fields for incoming requests. Responds with error message if fields are missing in the request body (headers and/or query as an option).

## Installation

Install the dependency

```
npm install express-required-fields --save
```

## Code Example

Sample usage:

```
var express = require('express');
var app = express();
var required = require('express-required-fields')

app.post('/register', required(['email', 'password']), (req, res)=>{
  //this code will run if required fields are included in the request body
  })
```

## Options

Options can be used to customize the response. They can be passed as a second parameter

```
var express = require('express');
var app = express();
var required = require('express-required-fields')

app.post('/register', required(['email', 'password'],{ error_status:432, message:'A custom message' }), (req, res)=>{
  //this code will run if required fields are included in the request body
  })
```

Default options values are:

* error_status: 400
* message: 'Bad Request'
* show_required: true
* show_received: true
* accept_headers: false
* accept_query: false

## Tests

Mocha and Chai are used for testing. To run the tests:

```
npm test
```

## Connect with the author

Email me to flakolefluk@gmail.com

## Contributors

If you want to contribute, open a new issue or fork the repository and add a pull request

## License

Read LICENSE.md
