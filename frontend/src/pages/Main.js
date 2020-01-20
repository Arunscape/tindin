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

`;

const Name = styled.div`
    font: bold 5vw Open Sans;
    `;

const Description = styled.div`
    font:  2.5vw Open Sans;
    `;

const Main = () => {
    const classes = useStyles();

    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

    const [angle, setAngle] = useState(360);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

    const [swipee, setSwipee] = useState(null);

    useEffect(() => {

        console.log(user.tok)
        fetch(CONFIG.API + '/next-profile',
            {
                method: 'get',
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('userToken'),
                },

            }).then(res => res.json())
            .then(data => {
                console.log("NEXT PROFILE")
                console.log(data)
                setSwipee(data);
            }).catch(e => {
                console.log("HELLO" + e);
            })
    }
        , [])




    useEffect(() => {

        if (touchStart == null || touchEnd == null) {
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
            .then(data => {
                console.log("MATCHES")
                console.log(data)
                window.location.reload();
            }).catch(e => {
                console.log("HELLO" + e);

            })


    }, [touchEnd])

    useEffect(() => {
        const handleTouchStart = (e) => {
            e.preventDefault();
            setTouchStart({
                x: e.touches[0].screenX,
                y: e.touches[0].screenY,
            });
        }
        const handleTouchEnd = (e) => {
            e.preventDefault();
            const x = e.changedTouches[0].screenX;
            const y = e.changedTouches[0].screenY;
            setTouchEnd({
                x,
                y,
            });
            // todo just call the next profile api and update that way
            window.location.reload();
        }

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
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

    return <>
        {user.tok && (
            <SwipeArea>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={swipee && swipee.photos[0]}
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
                    </CardActionArea>
                </Card>

            </SwipeArea>)}
    </>


}

export default Main;
