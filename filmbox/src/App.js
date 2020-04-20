import React from 'react';
import List1 from './modules/dashbordFilm/container/List1';
import List from './modules/dashbordFilm/container/List';
import CommentBox from "../src/modules/dashbordFilm/componets/CommentBox";
import { BrowserRouter, } from 'react-router-dom';
import Navigation from './modules/navigation/Navigation';
import Body from './modules/navigation/Body';

function App() {
  return (
    // <div className="App">
    //   {/* <List>
    //   </List> */} 
    // </div>
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Body></Body>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
