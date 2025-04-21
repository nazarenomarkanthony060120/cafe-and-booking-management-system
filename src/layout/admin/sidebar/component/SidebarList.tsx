import {
  MdOutlineDashboard,
  MdLogout,
  MdOutlineChecklistRtl,
  MdOutlinePayments,
} from 'react-icons/md'

export const SidebarList = () => {
  return [
    { name: 'Dashboard', section: 'Dashboard', icon: MdOutlineDashboard },
    { name: 'Walk-in Customer', section: 'Walk-in Customer', icon: MdOutlinePayments },
    { name: 'Customer List', section: 'Customer List', icon: MdOutlinePayments },

    {
      name: 'Reservation',
      section: 'Reservation',
      icon: MdOutlineChecklistRtl,
    },
    { name: 'Bills', section: 'Bills', icon: MdOutlinePayments },
    { name: 'Logout', section: 'Logout', icon: MdLogout },
  ]
}
