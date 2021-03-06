import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import asyncHandler from 'express-async-handler'
import { RequestHandler } from 'express'
import { ValidationError } from './errors/ValidationError'
import { ValidationErrors } from './types/misc'

export function makeAsync(handlers: RequestHandler[]) {
  return handlers.map(asyncHandler)
}

// Validate a yup schema or throw an error.
export async function validateOrFail(
  input: any,
  schema: yup.ObjectSchema<any>
) {
  try {
    await schema.validate(input, { abortEarly: false })
  } catch (err) {
    const errors = formatYupValidationErrors((err as yup.ValidationError).inner)
    throw new ValidationError(errors)
  }
}

export function formatYupValidationErrors(
  errors: yup.ValidationError[]
): ValidationErrors {
  const formattedErrors: ValidationErrors = {}

  errors.forEach((err) => {
    const field = err.path as string
    formattedErrors[field] = err.errors[0]
  })

  return formattedErrors
}

export function uuid(): string {
  return uuidv4()
}