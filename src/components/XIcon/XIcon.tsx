import React from 'react'
import styled from 'styled-components'

const X = styled.div`
  display: inline-block;
  position: relative;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
`

const XCircle = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: red;
  border-radius: 12px;
  left: 0;
  top: 0;
`

const XStem = styled.div`
  position: absolute;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const XStem1 = styled(XStem)`
  width: 3px;
  height: 9px;
`

const XStem2 = styled(XStem)`
  width: 9px;
  height: 3px;
`

const XIcon = () => {
  return (
    <X>
      <XCircle />
      <XStem1 />
      <XStem2 />
    </X>
  )
}

export default XIcon