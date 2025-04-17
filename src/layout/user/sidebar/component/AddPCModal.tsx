'use client'

import ModalInputContainer from '@/feature/admin/dashboard/component/modalComponent/modalInputContainer/ModalInputContainer'
import { ModalLayout } from '@/feature/admin/dashboard/component/modalComponent/modalLayout/ModalLayout'

interface AddNewPcProps {
  isOpen: boolean
  onClose: () => void
}

const AddPCModal = ({ isOpen, onClose }: AddNewPcProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <ModalInputContainer onClose={onClose} />
    </ModalLayout>
  )
}

export default AddPCModal
