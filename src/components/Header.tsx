import React from 'react';
import Typing from 'react-typing-animation';
import './Header.scss';

const Header = (): React.ReactElement => {
    return (
        <div className="header">
            <Typing hideCursor={false}>
                <h1 className="title">Welcome to SpaceX past launches.</h1>
            </Typing>
        </div>
    );
};

export default Header;
