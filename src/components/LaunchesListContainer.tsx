/* eslint-disable @typescript-eslint/ban-types */
import { useQuery } from '@apollo/client';
import React, { useState, useRef } from 'react';
import { PastLaunchQuery } from '../Queries';
import LaunchItem from './LaunchItem';
import './LaunchListContainer.scss';
import InfiniteScroll from 'react-infinite-scroller';

let inThrottle: boolean;
export interface LaunchHistory {
    mission_name: string;
    id: string;
    launch_date_local: string;
    launch_site: {
        site_name_long: string;
    };
    links: {
        article_link: string;
        video_link: string;
    };
    rocket: {
        rocket_name: string;
        rocket_type: string;
        first_stage: {
            cores: Array<{
                flight: number;
                core: {
                    reuse_count: number;
                    status: string;
                };
            }>;
        };
        second_stage: {
            payloads: Array<{
                payload_type: string;
                payload_mass_kg: number;
                payload_mass_lbs: number;
            }>;
        };
    };
    ships: Array<{
        name: string;
        home_port: string;
        image: string;
    }>;
}

interface LaunchHistoryData {
    launchesPast: LaunchHistory[];
}

interface LaunchHistoryVars {
    limit: number;
    offset?: number;
}

const LaunchesListContainer: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data, fetchMore, loading } = useQuery<
        LaunchHistoryData,
        LaunchHistoryVars
    >(PastLaunchQuery, {
        variables: {
            offset: 0,
            limit: 10,
        },
    });

    const loadMore = (): void => {
        if (!loading) {
            fetchMore({
                variables: {
                    offset: offset + 10,
                    limit: 10,
                },
            });
        }

        setOffset((val) => val + 10);
    };

    const throttle = (callback: Function, time: number): (() => void) => {
        return (...args: unknown[]) => {
            if (!inThrottle) {
                callback(...args);
                inThrottle = true;

                setTimeout(() => (inThrottle = false), time);
            }
        };
    };
    console.log(data);

    return (
        <div className="launchListContainer">
            <div className="subContainer" ref={scrollRef}>
                {data && (
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={throttle(loadMore, 1000)}
                        hasMore={
                            data ? data.launchesPast.length % 10 === 0 : false
                        }
                        loader={
                            <div
                                className="loader"
                                key={0}
                                style={{
                                    color: '#efefef',
                                }}
                            >
                                Loading ...
                            </div>
                        }
                        useWindow={false}
                        getScrollParent={() => scrollRef.current}
                        threshold={10}
                    >
                        {data?.launchesPast.map((launch) => (
                            <LaunchItem data={launch} key={launch.id} />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default LaunchesListContainer;
