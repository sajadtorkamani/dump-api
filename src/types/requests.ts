export interface RegisterRequest {
  email: string
  password: string
}

export type LoginRequest = RegisterRequest

export interface UpdateDumpRequest {
  content?: string
}