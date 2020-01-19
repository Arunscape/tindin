import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Tindinlogo from '../assets/tindinlogo.svg';

const Centering = styled.div`
text-align: center;
margin: 2rem;
`;


const SignIn = () => {
    const history = useHistory();



    return <>
        <CssBaseline />
        <img src={Tindinlogo} />
        <Centering>Welcome</Centering>
        <button onClick={() => history.push("/signin-email")}>Sign in</button>
    </>

}

export default SignIn;

