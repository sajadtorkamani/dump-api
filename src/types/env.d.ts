declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string
    FRONTEND_URL: string,
    SECRET_KEY: string
  }
}
