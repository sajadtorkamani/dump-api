import { RegisterRequest } from '../types/requests'

class UserService {
  async createUser(request: RegisterRequest) {
    
    console.log('Creating a user', request)

    const sql = `INSERT INTO `
  }
}

const userService = new UserService()

export default userService
