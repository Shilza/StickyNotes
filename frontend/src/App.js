import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {setUser} from "./features/common/models/auth";
import Routes from "./routes";
import {ThemeProvider} from "styled-components";
import {useStore} from "effector-react";
import {$board} from "./features/dashboard/models/board";
import {LoadingPage} from "./ui/pages";

const GET_ME = gql`
    query me {
        me {
            username
        }
    }
`;

const App = () => {
    let {color} = useStore($board);

    return (
        <Query query={GET_ME}>
            {({data, loading, error}) => {
                if (loading) return <LoadingPage/>;
                if (error) return <div>Graph server error</div>;

                if (data.me)
                    setUser(data.me);
                return (
                    <ThemeProvider theme={{backgroundColor: color}}>
                        <Routes/>
                    </ThemeProvider>
                )
            }}
        </Query>
    );
};

export default App;
