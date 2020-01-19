import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';
import axios from 'axios'
import CONFIG from '../config'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default () => {
    const classes = useStyles();

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


    return (<>
        <form className={classes.root} noValidate autoComplete="on" action="javascript:void(0);" onSubmit={async () => {
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
            <TextField
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="email" />
            <button type="submit">Verify</button>
        </form>
        <div>{email}</div>
    </>
    );
}