import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Redirect } from 'react-router-dom';
import useGlobalState from '../useGlobalState';

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

    const [valid, setValid] = useState(false);
    const { loggedin, setLoggedIn } = useGlobalState();

    useEffect(() => {

        setValid(true);
        setLoggedIn(true);

    }, [setLoggedIn, setValid])

    return (
        <div className={classes.root}>
            <div>Verifying...</div>
            <LinearProgress />
            {valid && <Redirect to="/" />}
        </div>
    );
}