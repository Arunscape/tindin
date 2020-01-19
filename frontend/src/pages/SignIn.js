import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
const centering=styled.div`
text-align:center`

export default () => {
    const history = useHistory();

    return <>
        <centering>Welcome</centering>
        <button onClick={() => history.push("/signin-email")}>Sign in</button>
    </>

}

