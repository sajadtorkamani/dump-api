export interface RegisterRequest {
  email: string
  password: string
}

export interface LoginRequest extends RegisterRequest {}