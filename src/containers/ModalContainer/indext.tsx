import { DialogContent, Modal } from '@mui/material'
import React, { ReactNode } from 'react'
import { closeModal, getCurrentModal } from '../../slices/modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type Props = {
  modalId: string,
  ModalContent?: Element,
  children: ReactNode
}



const ModalContainer = ({modalId,children }: Props) => {
  const current_modal = useAppSelector(getCurrentModal)

  const dispatch = useAppDispatch()

  return (
    <Modal open = {current_modal === modalId} onClose={() => dispatch(closeModal())}>
      <DialogContent>
       {children}
      </DialogContent>
    </Modal>
  )
}

export default ModalContainer