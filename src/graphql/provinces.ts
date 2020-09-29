import {gql} from "@apollo/client";

export const GET_PROVINCES = gql`    
    {
        getProvinces {
            _id
            name
        }
    }
    
`