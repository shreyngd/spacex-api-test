import React from 'react';
import './App.scss';
import LaunchesListContainer from './components/LaunchesListContainer';
import Stars from './components/Stars';
import Rocket from './components/Rocket';
import Header from './components/Header';

const App = (): React.ReactElement => {
    return (
        <div className="App">
            <Stars />
            <Rocket />
            <Header />
            <LaunchesListContainer />
        </div>
    );
};

export default App;
