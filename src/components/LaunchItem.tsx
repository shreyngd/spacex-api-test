import React from 'react';
import { LaunchHistory } from './LaunchesListContainer';
import HR from './HR';
import './LaunchItem.scss';
import ReactPlayer from 'react-player/youtube';
import { format } from 'date-fns';
import MapIcon from '../assets/map.png';
import { useAppDispatch } from '../app/hooks';
import { addToComapare } from '../features/compare/compareSlice';

interface LaunchItemProps {
    data: LaunchHistory;
}

const LaunchItem: React.FC<LaunchItemProps> = ({ data }: LaunchItemProps) => {
    const dispatch = useAppDispatch();
    const openLocation = (): void => {
        window.open(
            'https://www.google.com/maps?q=' +
                encodeURIComponent(data.launch_site.site_name_long),
            '_blank',
        );
    };
    return (
        <div className="launchItem">
            <div className="itemContainer">
                <div className="title">
                    {data.mission_name}
                    <button onClick={() => dispatch(addToComapare(data))}>
                        Add to compare
                    </button>
                </div>
                <HR />
                <div className="l2">
                    <div className="left">
                        <ReactPlayer
                            url={data.links.video_link}
                            width="100%"
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                    <div className="right">
                        <div className="info">
                            <div className="info1">
                                Lauched on{' '}
                                <strong>
                                    {format(
                                        new Date(data.launch_date_local),
                                        'dd/MM/yyyy',
                                    )}
                                </strong>
                            </div>
                            <div className="info2">
                                Read about it on{' '}
                                <a
                                    href={data.links.article_link}
                                    target="_blank"
                                >
                                    Wikipedia
                                </a>{' '}
                            </div>
                            <div className="info3">
                                <div>Launced from: </div>
                                <div className="info3subDiv">
                                    <strong>
                                        {data.launch_site.site_name_long}
                                    </strong>

                                    <div
                                        role="button"
                                        tabIndex={0}
                                        title="View on map"
                                        onClick={openLocation}
                                    >
                                        <img
                                            src={MapIcon}
                                            alt="View on Map"
                                            className="map-icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <HR />
                        <div className="rocket-info">
                            <div className="rocket-name">
                                Rocket name:{' '}
                                <strong>{data.rocket.rocket_name}</strong>
                            </div>
                            <div className="rocket-name">
                                Rocket type:{' '}
                                <strong>{data.rocket.rocket_type}</strong>
                            </div>
                            <div className="stages-info">
                                <div className="stage-1">
                                    <div className="title-stages">
                                        First Stage
                                    </div>
                                    {data.rocket.first_stage.cores.map(
                                        (core, index) => (
                                            <div className="core">
                                                <div className="core-title">
                                                    Core {index + 1}:
                                                </div>
                                                <div className="core-view">
                                                    <div>
                                                        Flight:{core.flight}
                                                    </div>
                                                    <div>
                                                        Reuse Count:
                                                        {core.core.reuse_count}
                                                    </div>
                                                    <div>
                                                        Status:
                                                        {core.core.status}
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="stage-2">
                                    <div className="title-stages">
                                        Second Stage
                                    </div>
                                    <div className="payloads">
                                        <div className="payload payload-title">
                                            <strong>Type</strong>
                                            <strong>Mass(in Kgs.)</strong>
                                            <strong>Mass(in Lbs.)</strong>
                                        </div>
                                        {data.rocket.second_stage.payloads.map(
                                            (payload) => (
                                                <div className="payload">
                                                    <div>
                                                        {payload.payload_type}
                                                    </div>
                                                    <div>
                                                        {payload.payload_mass_kg
                                                            ? payload.payload_mass_kg
                                                            : 'N/A'}
                                                    </div>
                                                    <div>
                                                        {payload.payload_mass_lbs
                                                            ? payload.payload_mass_lbs
                                                            : 'N/A'}
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <HR />
                <div>
                    Ships used:{' '}
                    <strong>{data.ships.filter((ship) => ship).length}</strong>
                </div>

                <div className="ships-view">
                    {data.ships
                        .filter((ship) => ship)
                        .map((ship) => (
                            <div className="ship-view">
                                <img
                                    className="ship-img"
                                    src={ship.image}
                                    alt=""
                                />
                                <div className="ship-name">
                                    <strong>{ship.name}</strong>
                                </div>
                                <div className="ship-port">
                                    <em>{ship.home_port}</em>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default LaunchItem;
