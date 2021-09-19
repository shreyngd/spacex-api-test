import React from 'react';
import Typist from 'react-typist';
import './Header.scss';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '../app/hooks';
import { changeSearch } from '../features/search/searchSlice';

const Header = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        dispatch(changeSearch(e.target.value));
    };
    return (
        <div className="header">
            <Typist
                cursor={{
                    show: false,
                }}
            >
                <div className="title">Welcome to SpaceX past launches.</div>
            </Typist>
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        placeholder="Mission or Rocket name"
                        onChange={debounce(onChange, 500)}
                        required
                    />
                    <i className="fa fa-search"></i>
                </form>
            </div>
        </div>
    );
};

export default Header;
