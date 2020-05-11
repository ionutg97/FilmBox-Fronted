import React from 'react';
//import  ImageIcon from '../../assets/add_box_24px.svg';
//import FileList from './FileList';
import { StyledLabel, HiddenInput, StyledUploadInput, InputHint, StyledEditError, UploadButton, FileInputContainer } from './UserFileInputMovieStyledComps';
//import { readFile, getResumeFileName } from '../../containers/UserEdit/edit-page/Utils';

export const getFileBase64Extension = (fileBase64) => {
    if (fileBase64 !== null && fileBase64 !== undefined) {
        if (fileBase64.includes("data:"))
            return "." + fileBase64.split(';')[0].split('/')[1];
    }
    return null;
}

export const getResumeFileName = (resume) => {
    if (resume !== null && resume !== undefined && resume.length > 0) {
        let extension = getFileBase64Extension(resume);

        if (extension !== null)
            return ["resume" + extension];
        return ["resume"];
    }

    return [];
}


export class InputFile extends React.Component {
state = {
    selectedFile: null,
    uploadedFile: null,
    error: null,
};
SUPPORTED_FORMATS = ['webm'];

isInputValid = () => {
    return this.state.error === undefined || this.state.error === null || this.state.error === "";
}

getStyle() {
    return {
        gridArea: "span 1 / span " + this.props.colSpan,
        maxWidth: this.props.colSpan === "1" ? "20rem" : ""
    };
}

getLabelText() {
    if (this.state.selectedFile !== null)
        return this.state.selectedFile;

    return "Select file from computer";

}

onChange = (event) => {
    const file = event.target.files[0];
    let fileError = null;
    let format = file.name.split('.');
    let extension = format[format.length-1];
   
    if ( !this.SUPPORTED_FORMATS.includes(extension))
        fileError = `Formats supported: ${this.SUPPORTED_FORMATS.map(item => item.toUpperCase()).join(', ')}`;

    if (fileError === null) {
        this.setState({ error: null });
        this.setState({ selectedFile: file.name })
       // readFile(file, this.onRead);
    }
    else {
        this.setState({ uploadedFile: null });
        this.setState({ error: fileError })
    }
}

onRead = (fileBase64) => {
    this.setState({ uploadedFile: this.state.selectedFile, selectedFile: null });

    this.props.onChange({
        target: {
            name: "resume",
            value: fileBase64
        }
    })
};

getFileNames = () => {
    if (this.state.seletedFile !== null && this.props.file !== null && this.props.file !== undefined) {
        if (this.state.uploadedFile !== null)
            return [this.state.uploadedFile];
        else
            return [getResumeFileName(this.props.file)];
    }

    return null;
}

uploadVideo = () =>{
    console.log("C:\\Users\\ionut\\OneDrive\\Documents\\Licenta\\Backend\\Repository\\FilmBox\\discovery-server\\videos\\"+this.state.selectedFile);
}

deleteCallback = () => {
    this.setState({ uploadedFile: null });
    this.props.onChange({
        target: {
            name: "resume",
            value: ""
        }
    })
}

render() {
    return (
        <form style={this.getStyle()}>
            <StyledLabel>{this.props.label}</StyledLabel>
            <FileInputContainer>
                <HiddenInput id="file" onChange={this.onChange} name={this.props.name} type="file" />
                <StyledUploadInput id="input" htmlFor="file" onBlur={this.props.onBlur} isValid={this.isInputValid()}>{this.getLabelText()}</StyledUploadInput>
                <UploadButton htmlFor="file" isValid={this.isInputValid()}>Browse</UploadButton>
                <UploadButton isValid={true} onClick={this.uploadVideo}>Upload</UploadButton>
            </FileInputContainer>
            <InputHint><br />Formats supported: WEBM</InputHint>
            
            <StyledEditError>{this.state.error} </StyledEditError>
        </form>
    )
}

}
export default InputFile;