import styled from 'styled-components'
import { Button } from '../Button'

const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9ef33e;
  margin: auto;
  border: 2px solid #158601;
  transition: all 2s ease-in;
`

const ModalContent = styled.div`
  align-items: center;
`

const ModalHeader = styled.div`
  padding: 16px;
`

const ModalBody = styled.div`
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  flex-direction: column;
`

const ModalFooter = styled.div`
  padding: 16px;
`


interface ModalProps {
  show?: boolean
  closeFunc: () => void
}

const Modal: React.FC<ModalProps> = ({ show, closeFunc }) => {
  if (!show) return null
  return (
    <ModalDiv onClick={() => closeFunc()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          Modal Title
        </ModalHeader>
        <ModalBody>
          Modal Body
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => closeFunc()}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalDiv>
  )
}

export default Modal