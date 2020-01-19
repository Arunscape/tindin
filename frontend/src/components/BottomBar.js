import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';

import styled from 'styled-components';

import {
    ChatProcessing as ChatIcon,
    Account as AccountIcon,
} from 'mdi-material-ui';

import { useHistory } from 'react-router';


const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#EE357B',
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
        backgroundColor: 'white',
        color: '#EE357B',
    },
}));

const SHREK = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export default () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    {/* <SHREK> */}

                    <div className={classes.grow} />
                    <IconButton style={{ marginRight: '2em' }} edge="start" color="inherit" aria-label="open drawer" onClick={() => history.push('/chat')}>
                        <ChatIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        {/* <AddIcon /> */}
                        {/* <img src={HomeIcon} style={{ color: '#EE357B' }} /> */}
                        <HomeIcon />
                    </Fab>
                    {/* <IconButton color="inherit" onClick={() => history.push("/")}>
                        <SearchIcon />
                    </IconButton> */}
                    <IconButton edge="end" color="inherit" onClick={() => history.push("/profile")}>
                        <AccountIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    {/* </SHREK> */}
                </Toolbar>
            </AppBar>
        </>
    );
}