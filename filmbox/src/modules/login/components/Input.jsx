import React from 'react';
import styled from 'styled-components';

export const StyledLabel = styled.label`
font-family: 'Roboto';
font-size: 0.9rem;
line-height: 1.25rem;
color: #1A1919;
display:block;
font-weight: 500;
user-select: none;
`;

const StyledTextInput = styled.input.attrs(props => ({
    type: props.type
}))`
    border: ${props => props.isValid ? "1px solid #C7D0DA" : "1px solid red"};
    width:100%;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 1rem;
    padding-right:1rem;
    box-sizing: border-box;
    border-radius: 4px;
    
    ::placeholder{
        font-size: 0.75rem;
        color: #999;
    }
    :focus{
        outline: none;
    }
`;

export const StyledError = styled.span`
font-family: 'Roboto';
font-weight: 300;
font-size: 0.6rem;
line-height: 20px;
color: #C92828;
margin-bottom: 0.75rem;
margin-left: 1rem;
`

export class Input extends React.Component {

    isInputValid = () => {
        return this.props.error === null || this.props.error === "";
    }

  render() {
    return (
      <React.Fragment>
        <StyledLabel>{this.props.label}</StyledLabel>
        <StyledTextInput
          type={this.props.type}
          placeholder={`Enter ${this.props.label.toLowerCase()}`}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          isValid={this.isInputValid()}
          onClick={this.props.onClick}
          value={this.props.value}
          disabled={this.props.disabled}
        />
        <StyledError>{this.props.error} </StyledError>
      </React.Fragment>
    );
  }
}

export default Input;