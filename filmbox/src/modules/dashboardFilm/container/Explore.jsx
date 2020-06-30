import React from "react";  
import {withRouter} from 'react-router-dom';

import Navigation from '../../navigation/Navigation';

export class Explore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <Navigation/>
                <div>
                    <p>Ionut</p>
                </div>
            </React.Fragment>
        );
        }
}

export default withRouter(Explore);