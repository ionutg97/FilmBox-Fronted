import styled from "styled-components";

export const Button = styled.button`
  opacity: ${props => (props.isValid ? "1" : "0.5")};
  cursor: ${props => (props.isValid ? "pointer" : "default")};
  color: ${props => props.textColor};
  box-shadow: ${props =>
    props.hasBoxShadow ? "0px 2px 2px 1px rgba(0, 0, 0, 0.1)" : "none"};
  background: ${props => props.background};
  border: ${props => props.border};

  border-radius: 2px;
  font-family: "Roboto";
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  line-height: 1.25rem;
  user-select: none;
  text-align: center;
  :focus {
    outline: none;
  }
  :active {
    background: ${props => (props.active ? "#4A545B" : props.background)};
    color: ${props => (props.active ? "white" : props.textColor)};
  }
  :disabled {
    background: #E9ECEF;
    border: 1px solid #C0CAD5;
    border-radius: 4px;
    color: #4A545B;
  }
`;

Button.defaultProps = {
  isValid: true,
  background: "#FF8F74",
  textColor: "white",
  hasBoxShadow: false,
  border: "0px",
  active: false
};

export default Button;