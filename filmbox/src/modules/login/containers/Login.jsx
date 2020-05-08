import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { ButtonContainer } from '../components/CreateStudentStyleComp';
import Button from '../components/Button';
import Input from '../components/Input';

import {isAdmin} from '../../common/utils';
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
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

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

    isFormValid = () => {
        if (
          this.state.name == "" ||
          this.state.password == ""
        )
          return false;
        return true;
      };
      
    saveForm = () => {
        const { login } = this.props;
        if (this.isFormValid()) 
        {
            login(
               this.state.name,
                this.state.password,
            {})
            .then(() => {
            if (this.props.isLogged) this.click();
            else
            {
                this.setState(
                    console.log(this.state)
                    //{
                    // errors: {
                    //     ...errors,
                    //     name: "Username or password is wrong!"
                    // }
                    //}
                )
            }
          })
        }
      };
    
      click = () => {      
          console.log("click after login() -> ",this.props.history);
        if (isAdmin()) this.props.history.push("/notification");
        else this.props.history.push("/account/video");
      };

    render() {
        return (
            <div>
                <Input
                    label="User Name"
                    type="text"
                    error={this.state.errors.name}
                    onChange={this.onChangeName}
                    onBlur={this.verifyInputName}
                    value={this.state.name}
                >
                </Input>
                <Input
                    label="Password"
                    type="password"
                    error={this.state.errors.password}
                    onChange={this.onChangePassword}
                    onBlur={this.verifyInputPassword}
                    value={this.state.password}
                   
                >
                </Input>
                <ButtonContainer>
                    <Button
                        background={this.state.backgroundSaveBtn}
                        onClick={this.saveForm}
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
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ login }, dispatch)
    }
}

const mapStateToProps = state => ({ 
    isLogged: state.login.login.isLogged,
    role:state.login.login.role
  });
  


  export default 
      connect(mapStateToProps, mapDispatchToProps)
      (Login)