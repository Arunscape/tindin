import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components'

import CONFIG from '../config'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});



const SwipeArea = styled.div`
    width: 100%;
    height: 100%;
    `;

const Main = () => {
    const classes = useStyles();

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const [angle, setAngle] = useState(null);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

    const [swipee, setSwipee] = useState(null);


    // useEffect(() => {
    //     fetch(CONFIG.API + '/matches',
    //         {
    //             method: 'get',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": user.tok,
    //             },

    //         }).then(res => res.json())
    //         .then(data => {
    //             console.log("MATCHES")
    //             console.log(data)
    //         }).catch(e => {
    //             console.log("HELLO" + e);

    //         })

    // }

    //     , [])

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

        fetch(CONFIG.API + '/swipe',
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": user.tok,
                },
                body: JSON.stringify({
                    swipee,
                    dir: angle,
                })

            }).then(res => res.json())
            .then(data => {
                console.log("MATCHES")
                console.log(data)
            }).catch(e => {
                console.log("HELLO" + e);

            })


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
            console.log("SETTING USER TOKEN TO")
            console.log(user.tok)
            console.log(tok)
            console.log({ ...user, tok })
            return;
        }

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
                <div>{user.tok}</div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Lizard
          </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
        </Button>
                        <Button size="small" color="primary">
                            Learn More
        </Button>
                    </CardActions>
                </Card>

            </SwipeArea>)}
    </>


}

export default Main;