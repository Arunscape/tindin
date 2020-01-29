import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../useGlobalState';


import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonLabel, IonImg } from '@ionic/react';
import styled from 'styled-components'

import CONFIG from '../config'

const Card = styled(IonCard)`
background: white;
max-height: 70%;
`;

const CardImage = styled.img`
// min-height: 50vh;
// min-width: 80vw;
// max-width: 100%;
`;

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

// const Name = styled.div`
// font: bold 5vw Open Sans;
// `;

// const Description = styled.div`
// font: 2.5vw Open Sans;
// `;

const AngleDisplay = styled.div`
font: 2.5vw Open Sans;
position: absolute;
top: 0;
left: 0;
`;

const Main = () => {
    // const classes = useStyles();

    const [touchStart, setTouchStart] = useState({ x: null, y: null, offset: { x: null, y: null } });
    const [touchEnd, setTouchEnd] = useState({ x: null, y: null });

    const [touchPos, setTouchPos] = useState({ x: null, y: null });


    const [angle, setAngle] = useState(null);

    const { user, setUser } = useGlobalState();
    const history = useHistory();

    const [swipee, setSwipee] = useState(null);

    const [offset, setOffset] = useState({ x: null, y: null });

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

        if (touchStart == null || touchEnd == null || Math.abs(touchStart.x - touchEnd.x) + Math.abs(touchStart.y - touchEnd.y) < 100) {
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
        setAngle(null)

    }, [touchEnd])


    useEffect(() => {
        const tok = localStorage.getItem('userToken');
        if (tok !== null) {
            setUser({ ...user, tok })
            return;
        }
        history.push('/signin');
    }, [])

    return <IonContent>

        {user.tok && (
            <SwipeArea>
                <AngleDisplay>{angle}</AngleDisplay>
                {swipee ? (
                    <Card
                        style={touchPos ? {
                            top: touchPos.y,
                            left: touchPos.x
                        } : null}
                        onTouchStart={(e) => {
                            const x = e.touches[0].clientX;
                            const y = e.touches[0].clientY;

                            setOffset({
                                x: x,
                                y: y
                            })

                            setTouchStart({ x, y });
                        }}
                        onTouchMove={(e) => {

                            const x = e.touches[0].clientX;
                            const y = e.touches[0].clientY;

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
                        <CardImage
                            src={swipee && swipee.photos && swipee.photos[0]}
                            title="Contemplative Reptile"
                        />
                        <IonCardContent>
                            <IonCardHeader>
                                <IonCardTitle>
                                    {swipee && swipee.name}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {swipee && swipee.bio}
                            </IonCardContent>
                        </IonCardContent>
                    </Card>) : 'OOF, no new matches for you 😢'}

            </SwipeArea>)}
    </IonContent>


}

export default Main;
