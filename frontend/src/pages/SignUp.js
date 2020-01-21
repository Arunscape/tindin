import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Heart from '../assets/altheart.svg';

const Background = styled.div`
height: 60vh;

display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: space-around;
background-image: linear-gradient(#EE357B , #2768B3);
height: 100vh;`
const Enter = styled.div`
padding 1rem;
font: bold italic 7vw Open Sans;
font-size: 7vw;
color: white;`
const Text = styled.input`
border: none;
background-color: #FFFFFF00;
color: white;
font: bold 5vw Open Sans;
border-bottom: 0.2rem solid white;`
const Image = styled.img`
width: 50%;
height: auto;
padding 2rem;`
const Form = styled.form`
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: space-around;
height: 25vh;`
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
margin: 2rem;
`

export default () => {

    const [name, setName] = useState(null);
    const history = useHistory();
    return (
        <Background>
            <Image src={Heart} />
            <Enter>Enter your name</Enter>
            <Form noValidate autoComplete="on" onSubmit={() => {
                history.push("/signup-bio");
                window.name = name
            }}>
                <Text
                    onChange={(e) => setName(e.target.value)}
                    id="standard-basic"
                    label="Name" />
                <Button type="submit">Submit</Button>
            </Form>
        </Background>
    );
}
