import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';


const Body = () => (
    <div>
        <Helmet bodyAttributes={{style: 'background-color : #C0C0C0'}}/>
        <Switch>
            <Route exect path="/psbd/login" />
            <Route exect path="/notification" />
            <Route exact path="/account/video"  />
            <Route exact path="/explore/video"  />
        </Switch>
    </div>
);
export default Body;