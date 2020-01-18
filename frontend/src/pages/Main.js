import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

export default () => {

    const { loggedIn } = useGlobalState();
    return <>
        {loggedIn ? <div>You're logged in</div> : <Redirect to="/signin" />}
    </>

}