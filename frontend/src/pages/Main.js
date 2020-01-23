import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

const Main = () => {
    const classes = useStyles();

    const [touchStart, setTouchStart] = useState({ x: null, y: null, offset: { x: null, y: null } });
    const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

    const [touchPos, setTouchPos] = useState({ x: null, y: null });


    const [angle, setAngle] = useState(360);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

    const [swipee, setSwipee] = useState(null);

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

        if (touchStart == null || touchEnd == null || Math.abs(touchStart.x - touchEnd.x) < 50 || Math.abs(touchStart.y - touchEnd.y) < 50) {
            return;
        }

        const toDegrees = (x) => (x > 0 ? x : (2 * Math.PI + x)) * 360 / (2 * Math.PI)
        setAngle(toDegrees(-Math.atan2(touchEnd.y - touchStart.y, touchEnd.x - touchStart.x)));

        console.log("ANGLE: " + angle)

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


    }, [touchEnd])

    useEffect(() => {

        let offset;

        const handleTouchStart = (e) => {

            console.log(e)
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            const el = document.getElementById('draggable-card');

            // const offset = {
            //     x: x - el.offsetLeft,
            //     y: y - el.offsetTop,
            // }

            offset = {
                x: x - el.offsetLeft,
                y: y - el.offsetTop,
            }


            setTouchStart({ x, y, offset });
        }

        const handleTouchEnd = (e) => setTouchEnd({
            x: e.changedTouches[0].screenX,
            y: e.changedTouches[0].screenY
        });

        const handleMove = (e) => {

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;

            const el = document.getElementById('draggable-card');

            const widthOffset = el.offsetWidth / 2;
            const heightOffset = el.offsetHeight / 2;

            console.log("ACTUAL: ", x, y)

            console.log(x - touchStart.offset.x, y - touchStart.offset.y);

            setTouchPos({
                x: x - offset.x,
                y: y - offset.y,
            })
        }

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    useEffect(() => {
        const tok = localStorage.getItem('userToken');
        if (tok !== null) {
            setUser({ ...user, tok })
            return;
        }
        history.push('/signin');
    }, [])

    // useEffect(() => {
    //     console.log(touchPos)
    // }, [touchPos])

    return <>
        {user.tok && (
            <SwipeArea>
                {swipee ? (
                    <Card
                        className={classes.card}
                        style={{ top: touchPos.y, left: touchPos.x }}
                        // style={{ top: 50, left: 50 }}
                        id="draggable-card"
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
