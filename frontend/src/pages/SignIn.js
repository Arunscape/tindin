import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Tindinlogo from '../assets/tindinlogo.svg'
import axios from 'axios';

const Centering = styled.div`
text-align: center;
margin: 2rem;
`;


export default () => {
    const history = useHistory();

    return <>
        <CssBaseline />
        <img src={Tindinlogo} />
        <Centering>Welcome</Centering>
        <button onClick={() => history.push("/signin-email")}>Sign in</button>
    </>

}

