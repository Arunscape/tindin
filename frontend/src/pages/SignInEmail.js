import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';

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


    return (<>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={() => {
            history.push("/signin-verify");
            setUser({ ...user, email })
        }}>
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="Standard" />
            <button type="submit">Verify</button>
        </form>
        <div>{email}</div>
    </>
    );
}