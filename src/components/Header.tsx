import React from 'react';
import Typist from 'react-typist';
import './Header.scss';

const Header = (): React.ReactElement => {
    return (
        <div className="header">
            <Typist
                cursor={{
                    show: false,
                }}
            >
                <div className="title">Welcome to SpaceX past launches.</div>
            </Typist>
        </div>
    );
};

export default Header;
