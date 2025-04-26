
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 7%;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 12px;
  border: 2px solid #0385FD;
  border-radius: 6px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #0385FD;
    box-shadow: 0 0 0 2px rgba(0, 111, 196, 0.2);
  }

  &::placeholder {
    color: #aaa;
    font-family: Poppins;
  }
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id?: string;
};

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput id={id} {...props} />
    </Wrapper>
  );
};

export default Input;