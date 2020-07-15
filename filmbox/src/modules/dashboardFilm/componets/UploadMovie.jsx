import React from 'react';
import styled from 'styled-components';

import InputFile from '../componets/InputFile';

export const InputFileArrea =styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DisplayPath = styled.p`
`;

export class UploadFile extends React.Component{
    onChange = (event) => {
        console.log("myFile",document.getElementById("myFile").value);
        document.getElementById("demo").innerHTML=document.getElementById("myFile").value;    
    }

    render() {
        return (
            <InputFileArrea>
            <div>
                <h3>Select a file to upload:</h3> 
        
                <InputFile 
                type="file" 
                id="myFile"
                onChange={this.onChange}>
                </InputFile>
                <DisplayPath id="demo"></DisplayPath >
                </div>
            </InputFileArrea>
            )
    }
}
export default UploadFile;