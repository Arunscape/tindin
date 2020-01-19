import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';
import styled from 'styled-components';

const Text = styled.input`
border: none;
background-color: #FFFFFF00;
color: white;
font: bold 5vw Open Sans;
border-bottom: 0.2rem solid white;
width: 80%;

`;

const YEET = styled.div`
height: 100vh;
width: 100vw;
background-image: linear-gradient(#EE357B, #2768B3);
align-items: center;
justify-content: center;
display: flex;
`;

const Button = styled.button`
background-cohttps://i.kym-cdn.com/photos/images/original/001/258/245/48f.pnglor: white;
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
        <YEET>

            <div>

                <Text onChange={(e) => window.images[0] = e.target.value} />
                <Text onChange={(e) => window.images[1] = e.target.value} />
                <Text onChange={(e) => window.images[2] = e.target.value} />
                <Text onChange={(e) => window.images[3] = e.target.value} />
                <Text onChange={(e) => window.images[4] = e.target.value} />


            </div>


            <Button onClick={() => {

                window.isForSignup = true;
                // window.images = images;

                history.push("/signin-verify");
                setLoggedIn(true);

            }}>Next</Button>
        </YEET>
    );
}
