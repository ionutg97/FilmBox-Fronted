import React from 'react';

import {GeneralContainer} from '../components/GeneralContainerStyledComp';
import Login from '../containers/Login';

export class FirstPage extends React.Component {

    render(){
        return (
            <GeneralContainer>
                <Login>

                </Login>
            </GeneralContainer>
        )};
}

export default FirstPage;