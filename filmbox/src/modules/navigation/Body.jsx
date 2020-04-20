import React from 'react';
import { Redirect,BrowserRouter,Route, Switch } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import FirstPage from '../login/containers/FirstPage';
import {isLoggedin} from '../common/utils';
import Explore from '../dashbordFilm/container/Explore';
import { connect } from 'react-redux';

const PrivateRoute = ({ Component, path, loggedIn }) => (
    <Route path={path}
        render={(props) => {
            return loggedIn() ? <Component {...props}/> : <Redirect to="/login" />;
        }}
    />
)


const Body = () => (
    <BrowserRouter>
        <Helmet bodyAttributes={{style: 'background-color : #C0C0C0'}}/>
        <Switch>
            <PrivateRoute exect path="/notification" Component={Explore} loggedIn={isLoggedin}/>
            <PrivateRoute exact path="/account/video" Component={Explore} loggedIn={isLoggedin} />
            <PrivateRoute exact path="/explore/video" Component={Explore} loggedIn={isLoggedin} />
            <Route exect path="/login" component={FirstPage} />
            <Redirect to="/explore/video" />
        </Switch>
    </BrowserRouter  >
);

const mapStateToProps = state => ({
    isLoged: state.login.login.isLoged
})
export default connect(mapStateToProps, null)(Body);