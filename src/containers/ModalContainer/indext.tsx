import { DialogContent, Modal, Paper } from '@mui/material'
import React, { ReactNode } from 'react'
import { closeModal, getCurrentModal } from '../../slices/modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type Props = {
  modalId: string,
  ModalContent?: Element,
  children: ReactNode
}



const ModalContainer = ({ modalId, children }: Props) => {
  const current_modal = useAppSelector(getCurrentModal)

  const dispatch = useAppDispatch()

  return (
    <Modal open={current_modal === modalId} onClose={() => dispatch(closeModal())}>
      <DialogContent >
        <Paper variant='fantasy' sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          boxShadow: 24,
          p: '1rem',
          borderRadius: '1rem'
        }}>
          {children}

        </Paper>
      </DialogContent>
    </Modal>
  )
}

export default ModalContainer