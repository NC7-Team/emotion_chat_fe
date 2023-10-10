import styled from 'styled-components';
import palette from '../../libs/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.cyan[900]};
  &:hover {
    background: ${palette.cyan[50]};
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
