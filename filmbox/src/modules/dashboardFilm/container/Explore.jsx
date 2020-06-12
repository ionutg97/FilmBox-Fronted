import React from "react";  
import {withRouter} from 'react-router-dom';


export class Explore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <div>
                    <p>Ionut</p>
                </div>
            </React.Fragment>
        );
        }
}

export default withRouter(Explore);