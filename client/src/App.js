import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Routes from './components/Routes';


function App() {
    return (
        <div className="App">
            <NavBar  />
            <div className="container">
                <Routes />
            </div>
        </div>
    );
}

export default App;