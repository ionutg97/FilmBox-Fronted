import styled from 'styled-components';

export const StyledLabel = styled.label`
    font-family: 'Roboto';
    font-size: 1rem;
    line-height: 1.25rem;
    color: #5B6168;
    display:block;
    user-select: none;
    font-weight: 400;
`;

export const StyledUploadInput = styled.label.attrs(props => ({}))`
    box-sizing: border-box;
    width:100%;
    max-width:17rem;
    height: 2.5rem;

    font-family: 'Roboto';
    font-size: 1rem;
    line-height: 1.375rem;
    color: ${props => props.children !== "Select file from computer" ? "#1A1919" : "#999"};
    white-space: nowrap;
    text-overflow: ellipsis;

    cursor: pointer;
    
    padding: 0.5625rem 2rem 0.5625rem 1rem;
    
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    
    border-style: solid;
    border-width: 0.125rem;
    border-radius: 0.25rem 0rem 0rem 0.25rem;
    border-color: ${props => props.isValid ? "#C0CAD5" : "#B52E40"}
`;

export const HiddenInput = styled.input.attrs(props => (({ type: "file" })))`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;

export const InputHint = styled.span`
    font-family: 'Roboto';
    height: 1rem;
    font-size: 1rem;
    line-height: 1.375rem;
    color: #4A545B;
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
export const StyledEditError = styled.span`
    min-height: 1rem;
    font-family: 'Roboto';
    font-size: 0.75rem;
    line-height: 1rem;
    color: #B52E40;
`

export const UploadButton = styled.label`
    box-sizing: border-box;
    width: 5rem;
    height: 2.5rem;
    font-family: 'Roboto';
    font-size: 1rem;
    line-height: 1.375rem;
    color: ${props => props.isValid? "#4A5056": "#B52E40"};
    cursor: pointer;
    padding: 0.5625rem 0.75rem 0.5625rem 0.75rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: ${props=> props.isValid?"#E9ECEF":"#ECB5C0"};
    border-style: solid;
    border-width: 0.125rem 0.125rem 0.125rem 0rem;
    border-radius: 0rem 0.25rem 0.25rem 0rem ;
    border-color: ${props => props.isValid ? "#C0CAD5" : "#B52E40"}
`

export const FileInputContainer = styled.div`
    display: flex;
`