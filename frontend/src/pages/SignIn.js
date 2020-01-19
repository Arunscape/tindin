import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';

const Centering = styled.div`
text-align: center;
margin: 2rem;
`;


export default () => {
    const history = useHistory();

    return <>
        <CssBaseline />
        <Centering>Welcome</Centering>
        <button onClick={() => history.push("/signin-email")}>Sign in</button>
    </>

}

