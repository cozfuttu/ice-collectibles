import { useNotification } from 'state/hooks'
import styled from 'styled-components'
import { Button } from '../Button'

const ModalDiv = styled.div<{ isError: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isError }) => isError ? "#f11708" : "#9ef33e"};
  margin: auto;
  border: 2px solid ${({ isError }) => isError ? "#8a0a01" : "#158601"};
  transition: all 2s ease-in;
  text-align: center;
  width: 640px;
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
  word-wrap: break-word;
`

const ModalFooter = styled.div`
  padding: 16px;
`


interface ModalProps {
  closeFunc: () => void
}

const Modal: React.FC<ModalProps> = ({ closeFunc }) => {
  const notification = useNotification()
  const isError = parseInt(notification!.status) > 0
  //  console.log('notification: ', notification)
  return (
    <ModalDiv isError={isError} onClick={closeFunc}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          {notification?.title}: {notification?.status}
        </ModalHeader>
        <ModalBody>
          {notification?.message}
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeFunc} style={{ backgroundColor: isError ? '#7e0800' : "#4aca00" }}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalDiv>
  )
}

export default Modal