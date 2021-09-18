import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { PastLaunchQuery } from '../Queries';
import LaunchItem from './LaunchItem';
import './LaunchListContainer.scss';

export interface LaunchHistory {
    mission_name: string;
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
    const { data, loading } = useQuery<LaunchHistoryData, LaunchHistoryVars>(
        PastLaunchQuery,
    );
    useEffect(() => {
        console.log(data);
    }, [data, loading]);
    return (
        <div className="launchListContainer">
            <div className="subContainer">
                {data?.launchesPast.map((launch) => (
                    <LaunchItem data={launch} />
                ))}
            </div>
        </div>
    );
};

export default LaunchesListContainer;
