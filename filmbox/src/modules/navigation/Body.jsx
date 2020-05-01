import React from 'react';
import { Redirect,BrowserRouter,Route, Switch } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';

import List from '../dashbordFilm/container/List';
import UploadFile from '../dashbordFilm/componets/UploadMovie';
import FirstPage from '../login/containers/FirstPage';
import {isLoggedin} from '../common/utils';
import Explore from '../dashbordFilm/container/Explore';

const PrivateRoute = ({ Component, path, loggedIn }) => (
    <Route path={path}
        render={(props) => {
            console.log("props",props);
            return loggedIn() ? <Component {...props}/> : <Redirect to="/login" />;
        }}
    />
)


const Body = () => (
    <div>
        <Helmet bodyAttributes={{style: 'background-color : #C0C0C0'}}/>
        <Switch>
            {/* <PrivateRoute  path="/notification" Component={Explore} loggedIn={isLoggedin}/>
            <PrivateRoute  path="/account/video" Component={List} loggedIn={isLoggedin} />
            <PrivateRoute  path="/explore/video" Component={Explore} loggedIn={isLoggedin} /> */}
            <Route exect path="/notification" component={Explore}></Route>
            <Route  exect path="/account/video" component={List}></Route>
            <Route  exect path="/explore/video" component={Explore}></Route>
            <Route  exect path="/login" component={FirstPage} />
        {/*<Redirect to="/explore/video" />*/}
        </Switch>
    </div  >
);


export default Body;