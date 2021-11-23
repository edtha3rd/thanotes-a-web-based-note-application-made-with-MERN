import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Button from '../components/Button';
import { useMutation, useApolloClient, gql } from "@apollo/client";
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

//include the props passed to the component for later use
const SignUp = props => {
    useEffect(() => {
        //update document title
        document.title = 'SignUp - Thanotes';
    });

    const client = useApolloClient();
    //Mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //store JWT in localStorage
            localStorage.setItem('token', data.signUp);
            //update the local cache
            client.writeData({ data: { isLoggedIn: true } });
            //redirect user to the homepage
            props.history.push('/');
        }
    });
//render form
return(
    <React.Fragment>
        <UserForm action={signUp} formType="signup" />
        {/*if data is loading display a loading message */}
        {loading && <p>Loading...</p>}
        {/* if there is an error, display an error message*/}
        {error && <p>Error creating an account!</p>}
    </React.Fragment>
    );
};

export default SignUp;