import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Tindinlogo from '../assets/tindinlogo.svg';

const Centering = styled.div`
margin: 2rem;
margin-top:0;
margin-bottom:0;
background-color: white;
height: 60vh;

display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: space-around;
`;
const Title = styled.img`
width: 100%;
height: auto;
padding 2rem;`
const Welcome = styled.div`
padding 1rem;
font: bold 7vw Open Sans;
font-size: 7vw;`
const Background = styled.div`
background-image: linear-gradient(#EE357B , #2768B3);
height: 100vh;`
const Whitebox = styled.div`
margin: 2rem;
margin-top:0;
background-color: white;
height: 100vh;`
const Button = styled.button`
background-color: #EE357B;
:active{
background-color: #B72C65;
}
color: white;
padding: 0.75rem;
text-align: center;
display: inline-block;
font: bold 4vw Open Sans;
font-size: 4vw;
border-radius: 0.5rem;
box-shadow: 0 0.2rem 0.7rem 0 rgba(0,0,0,0.2), 0 0.075rem 0.95rem 0 rgba(0,0,0,0.19);
`

const SignIn = () => {
    const history = useHistory();

    return <Background>
        <Whitebox>
            <Centering>
                <CssBaseline />
                <Title src={Tindinlogo} />
                <Welcome>Welcome!</Welcome>
                <Button onClick={() => history.push("/signin-email")}>Sign in</Button>
            </Centering>
        </Whitebox>
    </Background>
}

export default SignIn;

