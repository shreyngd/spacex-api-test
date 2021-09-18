import React from 'react';
import './Rocket.scss';
import RocketImg from '../assets/rocket.png';

const Rocket = (): React.ReactElement => {
    return (
        <div className="rocket-container">
            <img className="rocket" src={RocketImg} />
        </div>
    );
};

export default Rocket;
