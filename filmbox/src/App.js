import React from 'react';
import CommentBox from "../src/modules/dashbordFilm/componets/CommentBox";
import { BrowserRouter, } from 'react-router-dom';
import Navigation from './modules/navigation/Navigation';
import Body from './modules/navigation/Body';

function App() {
  return (
    <React.Fragment>
      
        <Navigation />
        <Body></Body>
    
    </React.Fragment>
  );
}

export default App;
