import { registerUser } from './register/register'
import { login } from './login/login'
import { addPcAdmin, isPcNumberTaken } from './addPcAdmin/addPcAdmin'
import { getPcList } from './addPcAdmin/getPcList'
import { customerData } from './customerData/customerData'
import { getCustomerData } from './customerData/getCustomerData'

export const api = {
  register: registerUser,
  login: login,
  addPcAdmin: addPcAdmin,
  getPcList: getPcList,
  isPcNumberTaken: isPcNumberTaken,
  customerData: customerData,
  getCustomerData: getCustomerData,
}
