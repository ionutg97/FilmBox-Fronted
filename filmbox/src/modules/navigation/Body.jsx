import React from 'react';
import { Redirect, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import List from '../dashboardFilm/container/List';
import FirstPage from '../login/containers/FirstPage';
import { isLoggedin } from '../common/utils';
import Explore from '../dashboardFilm/container/Explore';
import Notification from '../notification/containers/Notification';
import ChatBox from '../dashboardFilm/componets/ChatBox';

const PrivateRoute = ({ Component, path, loggedIn }) => (
    <Route path={path}
        render={(props) => {
            if(loggedIn()){
                console.log("aaiiii") 
                return(<Component {...props} />)
            }
            else
                return(<Redirect to="/login" />)
        }}
    />
)


const Body = () => (
    <div>
        <Helmet bodyAttributes={{ style: 'background-color : #C0C0C0' }} />
        <BrowserRouter>
            <Switch>
{/* 
            {<PrivateRoute exact path="/notification" Component={Notification} loggedIn={isLoggedin} />
            <PrivateRoute exact path="/account/video" Component={List} loggedIn={isLoggedin} />
            <PrivateRoute exact path="/chat/video" Component={ChatBox} loggedIn={isLoggedin} />
            <Route path="/login" component={FirstPage} />} */}

                <Route exect path="/notification" component={Notification}></Route>
                <Route exect path="/account/video" component={Explore}></Route>
                <Route exect path="/chat/video" component={ChatBox}></Route>
                <Route path="/login" component={FirstPage}></Route>
            </Switch>
        </BrowserRouter>
    </div  >
);


export default Body;