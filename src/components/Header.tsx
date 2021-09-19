import React from 'react';
import Typist from 'react-typist';
import './Header.scss';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    changeSearch,
    changeType,
    selectSearchType,
} from '../features/search/searchSlice';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    { value: 'mission_name', label: 'Search by mission name' },
    { value: 'rocket_name', label: 'Search by rocket name' },
];

const Header = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const typeSelect = useAppSelector(selectSearchType);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        dispatch(changeSearch(e.target.value));
    };
    const selectedOpt = options.find((el) => el.value === typeSelect);

    return (
        <div className="header">
            <Typist
                cursor={{
                    show: false,
                }}
            >
                <div className="title">Welcome to SpaceX past launches.</div>
            </Typist>
            <div className="inputs-header">
                <div>
                    <Dropdown
                        options={options}
                        value={selectedOpt}
                        controlClassName="type-dd"
                        onChange={(e) =>
                            dispatch(
                                changeType(
                                    e.value as 'mission_name' | 'rocket_name',
                                ),
                            )
                        }
                    />
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-container">
                        <input
                            id="name"
                            className="input"
                            type="text"
                            pattern=".+"
                            required
                            onChange={debounce(onChange, 700)}
                        />
                        <label className="label" htmlFor="name">
                            Enter Name
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Header;
