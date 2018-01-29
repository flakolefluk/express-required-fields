const {
  pick
} = require('./utils')

//accepts an array of strings of the required fields, and an options object
const required = (fields, opts) =>
  (req, res, next) => {
    opts = opts ? opts : {}
    fields.every(arg => Object.keys(req.body)
        .indexOf(arg) > -1) ?
      next() : res.status(opts.error_status ||  400)
      .json(
        Object.assign({
            message: opts.message || "Bad Request"
          },
          opts.show_required === false ? {} : {
            required: fields.join(', ')
          },
          opts.show_received === false ? {} : {
            received: Object.keys(pick(req.body, ...fields))
              .join(', ')
          }
        ))
  }

module.exports = required;
