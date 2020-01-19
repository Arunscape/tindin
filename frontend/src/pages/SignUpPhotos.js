import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';
import styled from 'styled-components';
import './yeet.css';
import Icon from '../assets/cameraicon.svg';

const Text = styled.input`
border: none;
background-color: #FFFFFF00;
color: white;
font: bold 5vw Open Sans;
border-bottom: 0.2rem solid white;
width: 80%;

`;
const Base = styled.div`
background-color: #2768B3;
height: 100vh;`

const YEET = styled.div`
background-image: linear-gradient(#EE357B , #2768B3);
background-attachment: fixed;
height: 1000px;
background-size: cover;
background-repeat: no-repeat;
background-position: center;`
;
const Title = styled.div`
padding 1rem;
font: bold italic 7vw Open Sans;
font-size: 7vw;
color: white;`

const Meme = styled.div`
align-items: center;
justify-content: center;
display: flex;
flex-flow: column nowrap;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;`

const Image = styled.img`
width: 50%;
height: auto;
padding 2rem;`

const Button = styled.button`
background-color: white;
:active{
background-color: #A0C9F2;
}
color: #2768B3;
padding: 1rem;
text-align: center;
display: inline-block;
font: bold 4vw Open Sans;
font-size: 4vw;
border-radius: 0.5rem;
margin: 2rem;`


export default function UploadButtons() {
    const history = useHistory();

    const { setLoggedIn } = useGlobalState();

    window.images = ["", "", "", "", ""];

    return (
        <Base>
        <YEET>
           
            <Meme>
                <Image src={Icon} />
                <Title>Upload Photos</Title>
                <Text class="banana" placeholder="Insert link" onChange={(e) => window.images[0] = e.target.value} />
                <Text class="banana" placeholder="Insert link" onChange={(e) => window.images[1] = e.target.value} />
                <Text class="banana" placeholder="Insert link" onChange={(e) => window.images[2] = e.target.value} />
                <Text class="banana" placeholder="Insert link" onChange={(e) => window.images[3] = e.target.value} />
                <Text class="banana" placeholder="Insert link" onChange={(e) => window.images[4] = e.target.value} />


            <Button onClick={() => {

                window.isForSignup = true;
                // window.images = images;

                history.push("/signin-verify");
                setLoggedIn(true);

            }}>Next</Button>
            </Meme>
        </YEET>
        </Base>
    );
}
