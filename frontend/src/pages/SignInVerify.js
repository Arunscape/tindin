import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Redirect } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

import CONFIG from '../config';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default () => {
    const classes = useStyles();

    const [valid, setValid] = useState('unknown');
    const { user, setUser, setLoggedIn } = useGlobalState();

    const [tempToken, setTempToken] = useState(null);


    useEffect(() => {
        const getToken = async () => await fetch(CONFIG.API + '/signin', {
            method: 'post',
            body: { email: user.email },

        }).catch(e => {
            console.log("HELLO" + e);
            return null;

        })

        const tok = getToken();

        if (tok !== null) {
            setTempToken(tok);
        }

    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            console.log('This will run after 1 second!')
            if (user.tok == null) {
                return;
            }

            const upgrade = async () => await fetch(CONFIG.API + '/upgrade', {
                method: 'post',
                body: { token: user.token },

            }).catch(e => {
                console.log("HELLO" + e);
                return null;

            })

            const res = upgrade();

            if (res.status === 400) {
                return;
            }

            if (res.status === 200) {
                setUser({ ...user, tok: res.data });

            }

        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {



        // make post request

        //if response = 4XX
        setValid('needssignup');


        //if response = 2XX
        setValid('loggedin');
        setLoggedIn(true);

    }, [setLoggedIn, setValid])

    return (
        <div className={classes.root}>
            <div>Verifying...</div>
            <LinearProgress />
            {valid === 'loggedin' && <Redirect to="/" />}
            {valid === 'needssignup' && <Redirect to="/signup" />}
        </div>
    );
}