const { pick } = require("./utils");

//accepts an array of strings of the required fields, and an options object
const required = (fields, opts) => (req, res, next) => {
  opts = opts ? opts : {};

  const data = {
    ...(opts.accept_query ? req.query : {}),
    ...(opts.accept_headers ? req.headers : {}),
    ...req.body
  };

  const show_required =
    opts.show_required != undefined ? opts.show_required : true;

  const show_received =
    opts.show_received != undefined ? opts.show_received : true;

  fields.every(arg => Object.keys(data).indexOf(arg) > -1)
    ? next()
    : res.status(opts.error_status || 400).json({
        message: opts.message || "Bad Request",
        ...(show_required ? { required: fields.join(", ") } : {}),
        ...(show_received
          ? { received: Object.keys(pick(data, ...fields)).join(", ") }
          : {})
      });
};

module.exports = required;
