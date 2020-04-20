import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from "redux";

import { ButtonContainer } from '../components/CreateStudentStyleComp';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import { login } from '../action/Action';

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            errors: {
                name: "",
                password: ""
            },
            backgroundSaveBtn: "#FF8F74"
        }
    }

    onChange = (fieldName, value) => {
        this.setState({
            [fieldName]: value
        });

    };

    onChangeName = event => {
        this.onChange("name", event.target.value);   
    }
    onChangePassword = event => {
        this.onChange("password", event.target.value);   
    }


    activateSaveButton = () => {
        const { backgroundSaveBtn } = this.state;
        if (this.state.errors.name === null && this.state.errors.password === null
            && this.state.name !== "" && this.state.password !== "") {
            this.setState({
                backgroundSaveBtn: "#32CD32"
            })
        }
        else {
            this.setState({
                backgroundSaveBtn: "#FF8F74"
            })
        }

    }

    verifyInputName = () => {
        const { errors } = this.state
        if (this.state.name === null || this.state.name === "") {
            this.setState({
                errors: {
                    ...errors,
                    name: "Field name is required"
                }
            },()=>{this.activateSaveButton()});

        }
        else {
            this.setState({
                errors: {
                    ...errors,
                    name: null
                }
            },()=>{this.activateSaveButton()});

        }
    }

    verifyInputPassword = () => {
        const { errors } = this.state
        if (this.state.password === null || this.state.password === "") {
            this.setState({
                errors: {
                    ...errors,
                    password: "Field password is required"
                }
            },()=>{this.activateSaveButton()});
        }
        else {
            this.setState({
                errors: {
                    ...errors,
                    password: null
                }
            },()=>{this.activateSaveButton()});
        }
    }

   doLogin = () => {
        if (this.state.errors.name === null && this.state.errors.password === null
            && this.state.name !== "" && this.state.password !== "") {
           // this.props.login(this.state.name, this.state.password);
            this.clearValue();
        }

    }

    clearValue = () => {
       
        this.setState({
            password: "",
            name: "",
            backgroundSaveBtn: "#FF8F74"
        });
    }

    render() {
        return (
            <div>
                <TextInput
                    label="User Name"
                    error={this.state.errors.name}
                    onChange={this.onChangeName}
                    onBlur={this.verifyInputName}
                    value={this.state.name}
                >
                </TextInput>
                <TextInput
                    label="Password"
                    error={this.state.errors.password}
                    onChange={this.onChangePassword}
                    onBlur={this.verifyInputPassword}
                    value={this.state.password}
                    type="password"
                >
                </TextInput>
                <ButtonContainer>
                    <Button
                        background={this.state.backgroundSaveBtn}
                        onClick={this.doLogin}
                    >
                        Login
                    </Button>

                    <Button
                        background="#32CD32"
                        onClick={this.clearValue}

                    >
                        Delete
                    </Button>
                </ButtonContainer>
            </div>
        );
    }

}
// function mapDispatchToProps(dispatch) {
//     return {
//         dispatch,
//         ...bindActionCreators({ login }, dispatch)
//     }
// }


export default connect(null, null)(Login)