import { ValidationError } from "../errors/ValidationError";
import { ParameterValidationError } from "../errors/ParameterValidationError";

export function parameterValidationErrorHandler(err, req, res, next) {
  if (err instanceof ParameterValidationError) {
    res.status(400).send({
      error: ParameterValidationError.name,
      param: err.param,
      value: err.value,
      message: err.message
    });
  }
  next(err);
}

export function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(400).send({
      error: ValidationError.name,
      message: err.message
    });
  }
  next(err);
}