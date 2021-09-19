import React from 'react';
import './ComparisionModal.scss';
import Modal from 'react-modal';
import CloseIcon from '../assets/close.png';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    allClear,
    closeModal,
    selectCompareData,
    selectCompareState,
} from '../features/compare/compareSlice';
import HR from './HR';
import { LaunchHistory } from './LaunchesListContainer';
import { format } from 'date-fns';

Modal.setAppElement('#modal');

const ComparisionModal: React.FC = () => {
    const open = useAppSelector(selectCompareState);
    const compareData = useAppSelector(selectCompareData);
    const dispatch = useAppDispatch();

    const compareArr: Array<LaunchHistory> = Object.entries(compareData).map(
        (el) => el[1],
    );

    const dataArr = [];
    const nameData = ['Mission Name'];
    const launchDateData = ['Launch Date & Time'];
    const launchLocationData = ['Launch Location'];
    const rocketNameData = ['Rocket Name & Type'];
    const coresData: Array<string | Array<string>> = ['Cores'];
    const payloadData: Array<string | Array<string>> = ['Payloads'];
    const shipData: Array<string | Array<string>> = ['Ships'];

    compareArr.forEach((launchData) => {
        nameData.push(launchData.mission_name);
        launchDateData.push(
            format(
                new Date(launchData.launch_date_local),
                'dd/MM/yyyy hh:mm a',
            ),
        );
        launchLocationData.push(launchData.launch_site.site_name_long);
        rocketNameData.push(
            `${launchData.rocket.rocket_name}, ${launchData.rocket.rocket_type}`,
        );
        coresData.push(
            launchData.rocket.first_stage.cores.map(
                (el) =>
                    `Flight:${el.flight}, Reuse Count:${el.core.reuse_count}, status:${el.core.status}`,
            ),
        );
        payloadData.push(
            launchData.rocket.second_stage.payloads.map(
                (el) =>
                    `Payload type:${el.payload_type}, Mass(in Kgs):${el.payload_mass_kg}, Mass(in Lbs):${el.payload_mass_lbs}`,
            ),
        );
        shipData.push(launchData.ships.map((sh) => sh.name));
    });

    dataArr.push(
        nameData,
        launchDateData,
        launchLocationData,
        rocketNameData,
        coresData,
        payloadData,
        shipData,
    );

    return (
        <Modal
            isOpen={open}
            onRequestClose={() => dispatch(closeModal())}
            contentLabel="Example Modal"
        >
            <div className="modal-content">
                <div className="modal-title">
                    <div className="left">Compare Launches</div>
                    <div
                        className="right"
                        onClick={() => dispatch(closeModal())}
                    >
                        <img src={CloseIcon} alt="Close"></img>
                    </div>
                </div>
                <HR />
                <div
                    className={`modal-body ${
                        compareArr.length === 0 && 'no-data'
                    }`}
                >
                    {compareArr.length === 0 ? (
                        <div className="no-data">No launches selected</div>
                    ) : (
                        <div className="launch-compare-body">
                            {dataArr.map((rowData) => (
                                <>
                                    <div className="compare-row">
                                        <div className="col1">{rowData[0]}</div>
                                        <div className="col2">
                                            {Array.isArray(rowData[1])
                                                ? rowData[1].map((el) => (
                                                      <div>{el}</div>
                                                  ))
                                                : rowData[1]}
                                        </div>
                                        <div className="col3">
                                            {Array.isArray(rowData[2])
                                                ? rowData[2].map((el) => (
                                                      <div>{el}</div>
                                                  ))
                                                : rowData[2]}
                                        </div>
                                    </div>
                                    <HR />
                                </>
                            ))}
                        </div>
                    )}
                </div>
                <HR />
                <div className="modal-footer">
                    <div
                        className="button1"
                        role="button"
                        tabIndex={0}
                        onClick={() => dispatch(closeModal())}
                    >
                        Close
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
        </Modal>
    );
};

export default ComparisionModal;
