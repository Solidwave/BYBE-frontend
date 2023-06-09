import { DialogContent, Modal, Paper, styled } from '@mui/material'
import React, { ReactNode } from 'react'
import { closeModal, getCurrentModal } from '../../slices/modal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type Props = {
  modalId: string,
  ModalContent?: Element,
  children: ReactNode
}

const CustomPaper = styled(Paper)(({theme}) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  width: '95%',
  transform: 'translate(-50%, -50%)',
  boxShadow: theme.shadows[24],
  padding: '1rem',
  borderRadius: '1rem',
  [theme.breakpoints.up('md')]: {
      width: '20%'
  }
}))



const ModalContainer = ({ modalId, children }: Props) => {
  const current_modal = useAppSelector(getCurrentModal)

  const dispatch = useAppDispatch()

  return (
    <Modal open={current_modal === modalId} onClose={() => dispatch(closeModal())}>
      <DialogContent >
        <CustomPaper variant='fantasy'>
          {children}
        </CustomPaper>
      </DialogContent>
    </Modal>
  )
}

export default ModalContainer