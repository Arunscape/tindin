import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';
import styled from 'styled-components';
import Heart from '../assets/altheart.svg';
import Icon from '../assets/icon1.svg';

const Background = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: space-around;
background-size: cover;
background-repeat: no-repeat;
background-position: center center;`
const Fixbackground = styled.div`
background-image: linear-gradient(#EE357B , #2768B3);
background-attachment: fixed;
height: 1000px;
background-size: cover;
background-repeat: no-repeat;
background-position: center;`
const Base = styled.div`
background-color: #2768B3;
height: 100vh;`
const Image = styled.img`
width: 50%;
height: auto;
padding 2rem;`
const Title = styled.div`
padding 1rem;
font: bold italic 7vw Open Sans;
font-size: 7vw;
color: white;`
const Info = styled.div`
padding 1rem;
font: 3vw Open Sans;
font-size: 3vw;
color: white;
margin: 2rem;`
const Form = styled.form`
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: space-around;
height: 25vh;
margin: 2rem;`
const Bio = styled.textarea`
border: 0.2rem solid white;
border-radius: 0.5rem;
background-color: #FFFFFF00;
color: white;
font: 2vw Open Sans;
box-sizing: border-box;
min-height: 10rem;
width: 80vw;
margin: 2rem;`
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


export default () => {

    const history = useHistory();



    return (
        <Base>
        <Fixbackground>
        <Background>
        <Image src={Icon} />
        <Title>Write up a bio!</Title>
        <Info>Showcase your date and/or hireability to the world! You have a character limit and only one place to showcase, so try your best to come up with the best summary of what you have to offer as you can! </Info>
        <Form noValidate autoComplete="on" onSubmit={() => {
            history.push("/signup-photos");
        }}>
            <Bio
                    onChange={(e) => window.bio = e.target.value}
                    id="standard-basic"
                    label="Bio"
                    maxlength="300"
                    required
            />
            <Button type="submit">Verify</Button>
        </Form>
    </Background>
    </Fixbackground>
    </Base>
    );
}
