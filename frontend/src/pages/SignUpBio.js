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

    const [bio, setBio] = useState(null);
    const history = useHistory();

    const { user, setUser } = useGlobalState();


    return (<>
        <form className={classes.root} noValidate autoComplete="on" onSubmit={() => {
            history.push("/signup-photos");
            setUser({ ...user, bio })
        }}>
            <TextField
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                id="standard-basic"
                label="bio" />
            <button type="submit">Verify</button>
        </form>
        <div>{bio}</div>
    </>
    );
}