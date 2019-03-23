export class ParameterValidationError extends Error {
  param: string;
  value: any;
  constructor(msg, param, value){
    super(msg);
    this.param = param;
    this.value = value;
  }
}