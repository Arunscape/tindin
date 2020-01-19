import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import CONFIG from '../config';

import styled from 'styled-components'
import Axios from 'axios';
import { copyFile } from 'fs';

const SwipeArea = styled.div`
    width: 100%;
    height: 100%;
    `;

const Main = () => {

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const [angle, setAngle] = useState(null);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

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

        const toDegrees = (x) => (x > 0 ? x : (2 * Math.PI + x)) * 360 / (2 * Math.PI)
        setAngle(toDegrees(-Math.atan2(touchEnd.y - touchStart.y, touchEnd.x - touchStart.x)));

        console.log("ANGLE: " + angle)
    }, [touchStart, touchEnd])

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    useEffect(() => {
        // run before page loads
        const tok = localStorage.getItem('userToken');
        if (tok !== null) {
            setUser({ ...user, tok })
            return;
        }

        // const getToken = async () => {
        //     return await axios.post(CONFIG.API + '/checkemail', {
        //         {
        //             "email": user.em
        //         }
        //     })

        console.log("HEEEEEEYYYYYYY");
        history.push('/signin');

    }, [])

    return <>
        {user.tok && (
            <SwipeArea>
                <div>Hello</div>
                <div>Touchstart</div>
                <div>{JSON.stringify(touchStart)}</div>
                <div>Touchend</div>
                <div>{JSON.stringify(touchEnd)}</div>
                <div>Angle</div>
                <div>{angle}</div>
            </SwipeArea>)}
    </>


}

export default Main;