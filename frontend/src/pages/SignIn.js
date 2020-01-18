import React from 'react'
import { useHistory } from "react-router-dom";


export default () => {
    const history = useHistory();

    return <>
        <div>Welcome</div>
        <button onClick={() => history.push("/signin-email")}>Sign in</button>
    </>

}

