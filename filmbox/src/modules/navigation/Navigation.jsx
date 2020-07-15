import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link }  from "react-router-dom";
import { withRouter } from "react-router-dom";

import { StyledNavigation, StyledNavigationMenu } from "./Navigation.style.jsx";

class Navigation extends Component {


    doLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("loggedUserId");
        localStorage.removeItem("role");
        this.props.history.push("/login");
        window.location.reload(false);
    }

    


    isAdmin = () => {
        if (localStorage.getItem("role")==="admin") {
            return (
                <StyledNavigationMenu>

                <li>
                    <Link to={'/notification'} >
                        Notification
                    </Link>
                </li>
                 
                 <li>
                     <Link to={'/account/video'}>
                         Video
                     </Link>
                 </li>
                 <li>
                     <Link to={'/chat/video'}>
                         Chat
                     </Link>
                 </li>
                 <li>
                     <Link onClick={this.doLogout} to={"/login"}> 
                         Logout
                     </Link>
                 </li>
                 </StyledNavigationMenu>

            )
        }
        else if(localStorage.getItem("role")==="user"){    
           return(
                <StyledNavigationMenu>
                <li>
                     <Link to="/account/video">
                         Video
                     </Link>
                 </li>
                 <li>
                     <Link to="/chat/video" >
                         Chat
                     </Link>
                 </li>
                 <li>
                     <Link onClick={this.doLogout} to="/login">
                         Logout
                     </Link>
                 </li>
                </StyledNavigationMenu>
           );
        }
        
        else return (<StyledNavigationMenu>
                <li>
                     <Link to="/login">
                     </Link>
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
export default withRouter(Navigation);
