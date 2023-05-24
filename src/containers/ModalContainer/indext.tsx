import { DialogContent, Modal } from '@mui/material'
import React, { ReactNode } from 'react'
import modal, { closeModal, getCurrentModal } from '../../slices/modal'
import { RootState } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type Props = {
  modalId: string,
  ModalContent?: Element,
  children: ReactNode
}



const ModalContainer = ({modalId, ModalContent,children }: Props) => {
  const current_modal = useAppSelector(getCurrentModal)

  const dispatch = useAppDispatch()

  return (
    <Modal open = {current_modal === modalId} onClose={() => dispatch(closeModal(modalId))}>
      <DialogContent>
       {children}
      </DialogContent>
    </Modal>
  )
}

export default ModalContainer