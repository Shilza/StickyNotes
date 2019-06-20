import React, {useState} from 'react';
import {Error, Form, Input, SubmitButton} from "../atoms";
import {withApollo} from "react-apollo";
import {withRouter} from "react-router";
import {setUser} from "../../common/models/auth";
import {SIGN_IN} from "../api";
import {Loader} from "../../../ui/atoms";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

export const SignInForm = withRouter(withApollo(({client, history}) => {
    let [error, setError] = useState(null);
    let [username, setUsername] = useState(null);
    let [password, setPassword] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    const signIn = async event => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const result = await client.mutate({
                mutation: SIGN_IN,
                variables: {
                    username,
                    password
                }
            });

            setUser(result.data.signIn);
            history.push('/boards');
        } catch(error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const usernameChange = event => {
        setUsername(event.target.value);
        setError(null);
    };

    const passwordChange = event => {
        setPassword(event.target.value);
        setError(null);
    };

    return (
        <Form onSubmit={signIn}>
            <Input
                placeholder={'Username'}
                onChange={usernameChange}
                required
                maxLength={12}
            />
            <Input
                placeholder={'Password'}
                onChange={passwordChange}
                type={'password'}
                required
                maxLength={12}
            />
            {
                error &&  <Error>{error}</Error>
            }
            <SubmitButton type={'submit'} disabled={isLoading}>
                Submit
            </SubmitButton>
            {
                isLoading && <Loader/>
            }
        </Form>
    )
}));