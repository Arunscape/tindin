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
        return axios.post(CONFIG.API + '/checkemail',
            {
                email
            })
    }


    return (<>
        <form className={classes.root} noValidate autoComplete="on" action="javascript:void(0);" onSubmit={async () => {
            // history.push("/signup-bio");
            const res = await checkemail();
            console.log("REEEEEE")
            console.log(res)
            // setUser({ ...user, email })
        }}>
            <TextField
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="email" />
            <button type="submit">Verify</button>
        </form>
        {/* <div>{email}</div> */}
    </>
    );
}