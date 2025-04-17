import { registerUser } from './register/register'
import { login } from './login/login'
import { addPcAdmin, isPcNumberTaken } from './addPcAdmin/addPcAdmin'
import { getPcList } from './addPcAdmin/getPcList'

export const api = {
  register: registerUser,
  login: login,
  addPcAdmin: addPcAdmin,
  getPcList: getPcList,
  isPcNumberTaken: isPcNumberTaken,
}
