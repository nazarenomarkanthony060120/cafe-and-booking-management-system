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
  monitorType: string
}

export type PcData = {
  monitorType: string
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
  monitorType: string
  action_status: string
}

export type ReservationData = {
  pcNumber: string
  reservation_status: string
  name: string
  email: string
  contactNumber: string
  reservation_time: string
  monitorType: string
  time_mode: string
  duration?: string
  reservation_type: string
}
