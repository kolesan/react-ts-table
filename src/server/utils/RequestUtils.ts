import { isPositiveFinite } from "./MathUtils";
import { ParameterValidationError } from "../errors/ParameterValidationError";

export function positiveFiniteNumber(param: string, name: string, defaultVal: number): number {
  const number = toNumber(param, name, defaultVal);
  if (!isPositiveFinite(number)) {
    throw new ParameterValidationError(
      `query param '${name}' can only be a finite positive number. Was: ${number}`,
      name,
      number
    );
  }
  return number;
}

export function toNumber(param: string, name: string, defaultVal: number): number {
  if (!param) {
    return defaultVal;
  }

  const number = Number(param);
  if (Number.isNaN(number)) {
    throw new ParameterValidationError(
      `query param '${name}' has to be a number. Was: ${param}`,
      name,
      param
    );
  }
  return number;
}
