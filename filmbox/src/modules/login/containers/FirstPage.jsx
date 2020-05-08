import React from 'react';
import { withRouter } from "react-router-dom";


import {GeneralContainer} from '../components/GeneralContainerStyledComp';
import Login from '../containers/Login';

export class FirstPage extends React.Component {

    render(){
        console.log("fP",this.props.history);
        return (
            <GeneralContainer>
                <Login 
                history={this.props.history}
                >

                </Login>
            </GeneralContainer>
        )};
}

export default FirstPage;