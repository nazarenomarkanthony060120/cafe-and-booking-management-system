export type RegisterFormValues = {
  name: string
  contactNumber: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginFormValues = {
  email: string
  password: string
}

export type AddPcFormValues = {
  pcNumber: string
}

export type PcData = {
  id: string
  pcNumber: string
  status: string
  email: string
}

export type WalkInCustomerData = {
  pcNumber: string
  name: string
  status: string
  start_time: string
  time_mode: string
  end_time: string
  payment: string
  type: string
  contactNumber: string
  created_date: string
  updated_date: string
}
