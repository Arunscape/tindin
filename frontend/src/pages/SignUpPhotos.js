import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButtons() {
    const classes = useStyles();
    const history = useHistory();

    const { setLoggedIn } = useGlobalState();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
        </Button>
            </label>
            <input
                accept="image/*"
                className={classes.input}
                id="text-button-file"
                multiple
                type="file"
            />
            <label htmlFor="text-button-file">
                <Button component="span">Upload</Button>
            </label>
            <input
                accept="image/*"
                className={classes.input}
                id="outlined-button-file"
                multiple
                type="file"
            />
            <label htmlFor="outlined-button-file">
                <Button variant="outlined" component="span">
                    Upload
        </Button>
            </label>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <button onClick={() => {
                history.push("/");
                setLoggedIn(true);

            }}>NExt</button>
        </div>
    );
}