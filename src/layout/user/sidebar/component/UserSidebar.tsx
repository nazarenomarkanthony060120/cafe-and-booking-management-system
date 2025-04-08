import {
  MdOutlineDashboard,
  MdLogout,
  MdOutlineChecklistRtl,
  // MdOutlinePayments,
} from 'react-icons/md'

export const UserSidebarList = () => {
  return [
    { name: 'Dashboard', section: 'Dashboard', icon: MdOutlineDashboard },
    {
      name: 'Reservation',
      section: 'Reservation',
      icon: MdOutlineChecklistRtl,
    },
    { name: 'Logout', section: 'Logout', icon: MdLogout },
  ]
}
