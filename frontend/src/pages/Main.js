import React from 'react';
import { Redirect } from 'react-router-dom';

export default () => {

    const loggedIn = false;
    return <>
        {loggedIn ? <div>You're logged in</div> : <Redirect to="/signin" />}
    </>

}