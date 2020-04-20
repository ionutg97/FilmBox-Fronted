import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

import { StyledNavigation, StyledNavigationMenu } from "./Navigation.style.jsx";


class Navigation extends Component {


    logout = () => {
        console.log("Logout")
        // this.setState({
        //   menuOpen: !this.state.menuOpen
        // });

        // localStorage.removeItem("jwt");
        // localStorage.removeItem("loggedUserId");
        // localStorage.removeItem("role");

        // this.props.history.push("/login");
    };


    isAdmin = () => {
        if (this.props.isLoged && this.props.isAdmin) {
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
                     <NavLink onClick={this.logout} to="/login" activeClassName="active">
                         Logout
                     </NavLink>
                 </li>
                 </StyledNavigationMenu>

            )
        }
        else if(this.props.isLoged){    
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
                     <NavLink onClick={this.logout} to="/login" activeClassName="active">
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
    isAdmin: state.login.login.isAdmin,
    isLoged: state.login.login.isLoged
})
export default connect(mapStateToProps, null)(Navigation);
