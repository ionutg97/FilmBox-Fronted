import React from 'react';
import List1 from './modules/dashbordFilm/container/List1';
import List from './modules/dashbordFilm/container/List';
import CommentBox from "../src/modules/dashbordFilm/componets/CommentBox";
import { BrowserRouter, } from 'react-router-dom';
import Navigation from './modules/navigation/Navigation';

function App() {
  return (
    // <div className="App">
    //   {/* <List>
    //   </List> */} 
    // </div>
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
