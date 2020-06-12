import styled from 'styled-components';

//$dark-grey: #404040;
//$nc-blue: #00BDFC;
//$nc-bl-dark: #0093C4;
//$red: #FC3F00;

// body {
//   font-family: 'PT Sans', sans-serif;
//   padding: 2rem;
// }

export const ButtonComm = styled.button`
  border: none;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.75em;
  display: inline-block;
  text-decoration: none;
  
  :hover {
    cursor: pointer;
  }
  :focus {
    text-decoration: none;
    outline: none;
  }
`;

export const CommentBox = styled.div`
  max-width: 37.5rem;
  color: #fff;
  background-color: #909090;
  border-radius: 0.875rem;
  padding: 0.2rem 1rem 2rem;
`;

export const CommentForm = styled.form`
  background-color: #fff;
  border-radius: 0.25rem;
  margin-bottom: 2rem;
  padding: 1rem;  
`;

export const CommentFormField = styled.div` 
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
    border: none;
    border-bottom: 1px solid #404040;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    width: 99%;
    
    :focus {
      border-bottom-color: #00BDFC;
      outline: none;
    }
`;

export const Textarea = styled.textarea`
    border: none;
    border-bottom: 1px solid #404040;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    width: 99%;

    :focus {
    border-bottom-color: #00BDFC;
    outline: none;
    }
    font-style: italic;
  
`; 

export const CommentFormAction = styled.div`
  
`;

export const CommentCount = styled.h4`
  color: #404040;
`;

export const CommentReveal = styled.button` {
  float: right;
  background-color: #00BDFC;
  color: #fff;
`;

export const Comment = styled.div` 
  border-top: 0.125rem solid #404040;
`;

export const CommentBody = styled.p`
  font-style: italic;
  margin-left: 1rem;
`;

export const CommentFooter = styled.div`
  margin-bottom: 1rem;
`;  

export const CommentFooterDelete = styled.a`
  padding: 0.2rem 0;
  color: #404040;
  text-decoration: none;
  
  :hover {
    color:#00BDFC;
    font-weight: bold;
  }
`;
