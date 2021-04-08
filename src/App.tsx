import React from 'react';
import './App.css';
import BeerListPage from "./page/BeerListPage"
import BeerDetailPage from "./page/BeerDetailPage"
import NavBar from "./component/NavBar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/:number" exact={true} component={BeerDetailPage} />
          <Route path="/" exact={true} component={BeerListPage} />
        </Switch>
      
      </Router>
    </div>
    
    
  );
}



export default App;
