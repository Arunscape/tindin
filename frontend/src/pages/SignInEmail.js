import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

    return (<>
        <form className={classes.root} noValidate autoComplete="on">
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="Standard" />
        </form>
        <div>{email}</div>
    </>
    );
}