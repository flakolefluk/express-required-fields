import { Request, Response, NextFunction } from 'express';
import { pick } from './utils';

interface RequiredOptions {
  accept_query?: boolean;
  accept_headers?: boolean;
  show_required?: boolean;
  show_received?: boolean;
  error_status?: number;
  message?: string;
}

//accepts an array of strings of the required fields, and an options object
const required = (fields: string[], opts: RequiredOptions = {}) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        message: opts.message || 'Bad Request',
        ...(show_required ? { required: fields.join(', ') } : {}),
        ...(show_received
          ? { received: Object.keys(pick(data, ...fields)).join(', ') }
          : {})
      });
};

export = required;
