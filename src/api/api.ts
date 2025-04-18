import { registerUser } from './register/register'
import { login } from './login/login'
import { addPcAdmin, isPcNumberTaken } from './addPcAdmin/addPcAdmin'
import { getPcList } from './addPcAdmin/getPcList'
import { getUserInfo } from './usersInfo/getUserInfo'

export const api = {
  register: registerUser,
  login: login,
  addPcAdmin: addPcAdmin,
  getPcList: getPcList,
  isPcNumberTaken: isPcNumberTaken,
  getUserInfo: getUserInfo
}
