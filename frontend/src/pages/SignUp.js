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

    const [name, setName] = useState(null);
    const history = useHistory();

    const { user, setUser } = useGlobalState();


    return (
        <>
            <form className={classes.root} noValidate autoComplete="on" onSubmit={() => {
                history.push("/signup-bio");
                setUser({ ...user, name })
            }}>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="standard-basic"
                    label="Name" />
                <button type="submit">Submit</button>
            </form>
            <div>{name}</div>
        </>
    );
}