import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";


import { StyledNavigation, StyledNavigationMenu } from "./Navigation.style.jsx";
import {logout} from '../login/action/Action';


class Navigation extends Component {

    doLogout = () => {
        {this.props.dispatch(logout())};
        console.log("here")
        this.props.history.push("/login");
        
        console.log("here")
    }

    isAdmin = () => {

        console.log("navigation",this.props)
        if (this.props.isLogged && this.props.role==="admin") {
            return (
                <StyledNavigationMenu>

                <li>
                    <NavLink to="/notification" activeClassName="active">
                        Notification
                    </NavLink>
                </li>
                 
                 <li>
                     <NavLink to="/account/video" activeClassName="active">
                         Video
                     </NavLink>
                 </li>
                 <li>
                     <NavLink to="/explore/video" activeClassName="active">
                         Explore
                     </NavLink>
                 </li>
                 <li>
                     <NavLink onClick={this.doLogout} to="/login" activeClassName="active">
                         Logout
                     </NavLink>
                 </li>
                 </StyledNavigationMenu>

            )
        }
        else if(this.props.isLogged && this.props.role==="user"){    
           return(
                <StyledNavigationMenu>
                <li>
                     <NavLink to="/account/video" activeClassName="active">
                         Video
                     </NavLink>
                 </li>
                 <li>
                     <NavLink to="/explore/video" activeClassName="active">
                         Explore
                     </NavLink>
                 </li>
                 <li>
                     <NavLink onClick={this.doLogout} to="/login" activeClassName="active">
                         Logout
                     </NavLink>
                 </li>
                </StyledNavigationMenu>
           );
        }
        
        else return (<StyledNavigationMenu>
                <li>
                     <NavLink to="/login" activeClassName="active">
                     </NavLink>
                 </li>
             </StyledNavigationMenu>);
    }

    render() {
        return (
            <StyledNavigation>

                    {this.isAdmin()}
                    
            </StyledNavigation>

        );
    }
}
const mapStateToProps = state => ({
    type: state.login.login.type,
    role: state.login.login.role,
    isLogged: state.login.login.isLogged
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ logout }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
