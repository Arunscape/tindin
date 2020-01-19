import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import styled from 'styled-components'

const SwipeArea = styled.div`
    width: 100%;
    height: 100%;
    `;

export default () => {

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleTouchStart = (event) => setTouchStart(event);
    const handleTouchEnd = (event) => setTouchEnd(event);

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const { loggedIn } = useGlobalState();
    // return <>
    //     {loggedIn ? <div>You're logged in</div> : <Redirect to="/signin" />}
    // </>

    return <SwipeArea>
        <div>Hello</div>
        <div>Touchstart</div>
        <div>{JSON.stringify(touchStart)}</div>
        <div>Touchend</div>
        <div>{JSON.stringify(touchEnd)}</div>
    </SwipeArea>

}