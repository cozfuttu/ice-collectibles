import { useNotification } from 'state/hooks'
import styled from 'styled-components'
import { Button } from '../Button'

const ModalDiv = styled.div<{ isError: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ isError }) => isError ? "#f1170855" : "#9ef33e55"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalContent = styled.div<{ isError: boolean }>`
  position: relative;
  max-width: 640px;
  padding: 24px;
  height: fit-content;
  background-color: ${({ isError }) => isError ? "#f11708" : "#9ef33e"};
  border: 2px solid ${({ isError }) => isError ? "#8a0a01" : "#158601"};
  transition: all 2s ease-in;
  text-align: center;
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
  const isError = notification!.title.includes('Error')
  //  console.log('notification: ', notification)
  return (
    <ModalDiv isError={isError} onClick={closeFunc}>
      <ModalContent isError={isError} onClick={e => e.stopPropagation()}>
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