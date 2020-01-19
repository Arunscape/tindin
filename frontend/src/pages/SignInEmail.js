import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';
import CONFIG from '../config';
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
const Title = styled.div`
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
margin: 2rem;`

export default () => {

    const [email, setEmail] = useState(null);
    const history = useHistory();

    const { user, setUser } = useGlobalState();


    const checkemail = async () => {
        console.log(email)
        return fetch(CONFIG.API + '/checkemail',
            {
                method: 'post',
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                },

            }).catch(e => {
                console.log("HELLO" + e);

            })

    }


    return (
        <Background>
        <Image src={Heart} />
        <Title>Enter your email</Title>
        <Form noValidate autoComplete="on" action="javascript:void(0);" onSubmit={async () => {
            // history.push("/signup-bio");
            const res = await checkemail();
            // console.log("REEEEEE: " + res.status);status

            if (res.status === 404) {
                history.push('/signup')
                console.log("I got 404")
            }

            if (res.status === 204) {
                setUser({ ...user, email })
                history.push('/signin-verify')
                console.log("I got 204")
            }
        }}>
            <Text
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="email" />
            <Button type="submit">Verify</Button>
        </Form>
    </Background>
    );
}