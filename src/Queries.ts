import { gql } from '@apollo/client';

export const PastLaunchQuery = gql`
    query laungHistory($offset: Int!, $limit: Int!) {
        launchesPast(limit: $limit, offset: $offset) {
            mission_name
            id
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
                rocket_type
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
