import { useQuery, gql } from '@apollo/client';
import React, { useEffect } from 'react';

const query = gql`
    {
        launchesPast(limit: 10) {
            mission_name
            launch_date_local
            launch_site {
                site_name_long
            }
            links {
                article_link
                video_link
            }
            rocket {
                rocket_name
                first_stage {
                    cores {
                        flight
                        core {
                            reuse_count
                            status
                        }
                    }
                }
                second_stage {
                    payloads {
                        payload_type
                        payload_mass_kg
                        payload_mass_lbs
                    }
                }
            }
            ships {
                name
                home_port
                image
            }
        }
    }
`;

const LaunchesListContainer = (): React.ReactElement => {
    const { data, loading } = useQuery(query);
    useEffect(() => {
        console.log(data);
    }, [data, loading]);
    return <div></div>;
};

export default LaunchesListContainer;
