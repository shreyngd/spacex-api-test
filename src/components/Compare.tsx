import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    deleteFromCompare,
    selectCompareData,
    allClear,
    openModal,
} from '../features/compare/compareSlice';
import './Compare.scss';
import TrashIcon from '../assets/trash.png';

const Compare: React.FC = () => {
    const compareSelect = useAppSelector(selectCompareData);
    const compareVals = Object.entries(compareSelect);
    const dispatch = useAppDispatch();
    if (compareVals.length) {
        compareVals.sort((a, b) => {
            return (
                new Date(a[1].launch_date_local).getTime() -
                new Date(b[1].launch_date_local).getTime()
            );
        });
    }

    const Disabled = (
        <div className="compare-disabled">Add launch for comparision</div>
    );

    return (
        <div className="compare-view">
            <div className="compare-buttons">
                {compareVals[0] ? (
                    <div className="compare">
                        <div>{compareVals[0][1].mission_name}</div>
                        <div
                            className="delete-icon"
                            title="Remove from comparision"
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                dispatch(
                                    deleteFromCompare(compareVals[0][1].id),
                                )
                            }
                        >
                            <img src={TrashIcon} alt="X"></img>
                        </div>
                    </div>
                ) : (
                    Disabled
                )}
                {compareVals[1] ? (
                    <div className="compare">
                        <div>{compareVals[1][1].mission_name}</div>
                        <div
                            className="delete-icon"
                            title="Remove from comparision"
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                dispatch(
                                    deleteFromCompare(compareVals[1][1].id),
                                )
                            }
                        >
                            <img src={TrashIcon} alt="X"></img>
                        </div>{' '}
                    </div>
                ) : (
                    Disabled
                )}
                <div
                    className="button1"
                    role="button"
                    tabIndex={0}
                    onClick={() => dispatch(openModal())}
                >
                    COMPARE
                </div>
                <div
                    className="button2"
                    role="button"
                    tabIndex={0}
                    onClick={() => dispatch(allClear())}
                >
                    CLEAR
                </div>
            </div>
        </div>
    );
};

export default Compare;
