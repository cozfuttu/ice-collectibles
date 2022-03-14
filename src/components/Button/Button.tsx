import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ disabled?: boolean }>`
  padding: 12px;
  cursor: ${({ disabled }) => !disabled && "pointer"};
  background-color: ${({ disabled }) => !disabled ? "#4aca00" : "#ffffff"};
  color: ${({ disabled }) => !disabled ? "#ffffff" : "#4aca00"};
  font-weight: bold;
  border-radius: 8px;
  transition: all 100ms linear;
  user-select: none;
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ disabled, children, ...props }) => {
  return (
    <StyledButton {...props} disabled={disabled} >
      {children}
    </StyledButton>
  )
}

export default Button