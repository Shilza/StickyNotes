import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {setUser} from "./features/common/models/auth";
import Routes from "./routes";

const GET_LAUNCHES = gql`
    query me {
        me {
            username
        }
    }
`;

const App = () => (
    <Query query={GET_LAUNCHES}>
        {({data, loading, error}) => {
            if (loading) return <div>Loading</div>;
            if (error) return <p>ERROR</p>;

            if (data.me)
                setUser(data.me);
            return <Routes/>;
        }}
    </Query>
);


export default App;
