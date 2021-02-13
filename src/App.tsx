import React from 'react';
import './App.css';
import BeerListPage from "./page/BeerListPage"
import BeerDetailPage from "./page/BeerDetailPage"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BeerListPage />
        <BeerDetailPage datafile="skorubrew1" />
        
      </header>
    </div>
  );
}



export default App;
