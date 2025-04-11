import { registerUser } from './register/register'
import { login } from './login/login'

export const api = {
  register: registerUser,
  login: login,
}
