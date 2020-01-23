import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import styled from 'styled-components'

import CONFIG from '../config'

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        position: 'absolute',
        overflow: 'visible',
        // '&:hover': {
        //     boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)'
        // }
        boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)',
    },
    media: {
        minHeight: '50vh',
        minWidth: '80vw'
    },
});

const SwipeArea = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
background-image: linear-gradient(#EE357B, #2768B3);
color: white;
text-align: center;
font: bold 5vw Open Sans;
overflow: hidden;
position: fixed;
    `;

const Name = styled.div`
font: bold 5vw Open Sans;
`;

const Description = styled.div`
font: 2.5vw Open Sans;
`;

const AngleDisplay = styled.div`
font: 2.5vw Open Sans;
position: absolute;
top: 0;
left: 0;
`;

const Main = () => {
    const classes = useStyles();

    const [touchStart, setTouchStart] = useState({ x: null, y: null, offset: { x: null, y: null } });
    const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

    const [touchPos, setTouchPos] = useState({ x: null, y: null });


    const [angle, setAngle] = useState(null);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

    const [swipee, setSwipee] = useState(null);

    const [offset, setOffset] = useState({ x: null, y: null });

    const cardRef = useRef(null);

    const swipeAreaRef = useRef(null);

    const getNextProfile = async () => {
        const data = await fetch(CONFIG.API + '/next-profile',
            {
                method: 'get',
                headers: {
                    "Authorization": localStorage.getItem('userToken'),
                },

            }).then(res => res.json());

        setSwipee(data);
    }

    useEffect(() => {
        getNextProfile();
    }, [])

    useEffect(() => {

        if (touchStart == null || touchEnd == null || Math.abs(touchStart.x - touchEnd.x) + Math.abs(touchStart.y - touchEnd.y) < 50) {
            return;
        }

        if (swipee == null || angle == null) {
            return;
        }

        fetch(CONFIG.API + '/swipe',
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.tok,
                },
                body: JSON.stringify({
                    swipee: swipee.id,
                    dir: angle + "",
                })

            }).then(res => res.json())

        getNextProfile();
        setSwipee(null);
        setTouchStart(null);
        setTouchPos(null)
        setTouchEnd(null);

    }, [touchEnd])


    useEffect(() => {
        const tok = localStorage.getItem('userToken');
        if (tok !== null) {
            setUser({ ...user, tok })
            return;
        }
        history.push('/signin');
    }, [])

    // console.log(swipeAreaRef)
    console.log(angle)
    return <>

        {user.tok && (
            <SwipeArea ref={swipeAreaRef}>
                <AngleDisplay>{angle}</AngleDisplay>
                {swipee ? (
                    <Card
                        className={classes.card}
                        style={touchPos ? { top: touchPos.y, left: touchPos.x } : null}
                        ref={cardRef}
                        onTouchStart={(e) => {
                            const x = e.touches[0].clientX;
                            const y = e.touches[0].clientY;

                            setOffset({
                                x: x - cardRef.current.offsetLeft,
                                y: y - cardRef.current.offsetTop,
                            })


                            setTouchStart({ x, y, offset });
                        }}
                        onTouchMove={(e) => {

                            const x = e.touches[0].clientX;
                            const y = e.touches[0].clientY;

                            if (x < 0 || y < 0 || x > swipeAreaRef.current.clientWidth || y > swipeAreaRef.current.clientHeight) {
                                return;
                            }

                            setTouchPos({
                                x: x - offset.x,
                                y: y - offset.y,
                            })

                            const toDegrees = (x) => (x > 0 ? x : (2 * Math.PI + x)) * 360 / (2 * Math.PI)
                            setAngle(toDegrees(-Math.atan2(y - touchStart.y, x - touchStart.x)));
                        }}
                        onTouchEnd={(e) => {
                            setTouchEnd({
                                x: e.changedTouches[0].clientX,
                                y: e.changedTouches[0].clientY
                            });
                        }}
                    >
                        <CardMedia
                            className={classes.media}
                            image={swipee && swipee.photos && swipee.photos[0]}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Name gutterBottom variant="h5" component="h2">
                                {swipee && swipee.name}
                            </Name>
                            <Description variant="body2" color="textSecondary" component="p">
                                {swipee && swipee.bio}
                            </Description>
                        </CardContent>
                    </Card>) : 'OOF, no new matches for you 😢'}

            </SwipeArea>)}
    </>


}

export default Main;
