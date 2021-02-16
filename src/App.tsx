import React from 'react';
import './App.css';
import BeerListPage from "./page/BeerListPage"
import BeerDetailPage from "./page/BeerDetailPage"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:number" exact={true}>
          <BeerDetailPage datafile="skorubrew1" />
        </Route>
        <Route path="/" exact={true}>
          <BeerListPage />
        </Route>
      </Switch>
      
    </Router>
    
  );
}



export default App;
