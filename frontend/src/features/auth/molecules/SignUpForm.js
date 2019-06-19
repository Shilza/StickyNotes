import React, {useState} from 'react';
import {Error, Form, Input, SubmitButton} from "../atoms";
import {withApollo} from "react-apollo";
import {withRouter} from "react-router";
import {setUser} from "../../common/models/auth";
import {SIGN_UP} from "../api";

export const SignUpForm = withRouter(withApollo(({client, history}) => {
    let [error, setError] = useState(null);
    let [username, setUsername] = useState(null);
    let [password, setPassword] = useState(null);
    let [passwordConfirm, setPasswordConfirm] = useState(null);

    const signUp = async event => {
        event.preventDefault();
        try {
            if(password === passwordConfirm) {
                const result = await client.mutate({
                    mutation: SIGN_UP,
                    variables: {
                        username,
                        password
                    }
                });

                setUser(result.data.signUp);
                history.push('/boards');
            } else {
                setError('Passwords must match');
            }
        } catch(error) {
            setError('Something went wrong');
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

    const passwordConfirmChange= event => {
        setPasswordConfirm(event.target.value);
        setError(null);
    };

    return (
        <Form onSubmit={signUp}>
            <Input
                onChange={usernameChange}
                placeholder={'Username'}
                required
                maxLength={12}
            />
            <Input
                onChange={passwordChange}
                placeholder={'Password'}
                type={'password'}
                required
                maxLength={12}
            />
            <Input
                onChange={passwordConfirmChange}
                placeholder={'Confirm password'}
                type={'password'}
                required
                maxLength={12}
            />
            {
                error &&  <Error>{error}</Error>
            }
            <SubmitButton type={'submit'}>Submit</SubmitButton>
        </Form>
    );
}));