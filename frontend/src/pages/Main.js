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

    const [angle, setAngle] = useState(null);

    const handleTouchStart = (e) => {
        // console.log(e)
        e.preventDefault();
        const x = e.touches[0].screenX;
        const y = e.touches[0].screenY;
        setTouchStart({
            x,
            y,
        });
        console.log("TOUCHSTART: ", x, y);
        if (touchStart == null) {
            console.log("WHY THE FUCK IS IT NULL?")
        }
    }
    const handleTouchEnd = (e) => {
        // console.log(e)
        e.preventDefault();
        const x = e.changedTouches[0].screenX;
        const y = e.changedTouches[0].screenY;
        setTouchEnd({
            x,
            y,
        });
        console.log("TOUCHEND: ", JSON.stringify(touchEnd));
    }

    useEffect(() => {

        if (touchStart == null || touchEnd == null) {
            return;
        }

        setAngle(Math.atan2(touchEnd.y - touchStart.y, touchEnd.x - touchStart.x));

        console.log("ANGLE: " + angle)
    }, touchStart, touchEnd)

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
        <div>Angle</div>
        <div>{angle}</div>
    </SwipeArea>

}