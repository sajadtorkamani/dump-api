import { ValidationErrors } from '../types/misc'

export class ValidationError extends Error {
  public errors: ValidationErrors

  constructor(errors: ValidationErrors) {
    super()
    this.name = 'ValidationError'
    this.errors = errors
  }
}
