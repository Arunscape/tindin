import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
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

    const { user, setUser } = useGlobalState();

    // const [tempToken, setTempToken] = useState(null);
    let timer;

    const history = useHistory();


    useEffect(() => {
        let path = 'signin'
        let body = { email: user.email }
        if (window.isForSignup) {
            path = 'signup'
            body = {
                email: window.email,
                name: window.name,
                bio: window.bio,
                photos: window.photos,
            }
        }
        console.log(body)
        console.log(path)
        const getTempToken = () => fetch(CONFIG.API + '/' + path, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },

        }).then(res => res.json())
            .then(data => {
                console.log('TEMP TOKEN');
                console.log(data);
                if (data !== null) {
                    timer = setInterval(() => {
                        console.log('This will run after 1 second!')
                        console.log(data)
                        if (data == null) {
                            return;
                        }

                        const upgrade = () => fetch(CONFIG.API + '/upgrade', {
                            method: 'post',
                            body: JSON.stringify({ tok: data }),
                            headers: {
                                "Content-Type": "application/json"
                            },

                        }).then(res => res.json()).then(d => {
                            console.log("ACTUAL TOKEN");
                            console.log(d)

                            if (d !== null) {
                                setUser({ ...user, tok: d });
                                console.log("USER")
                                console.log(user)
                                localStorage.setItem('userToken', d)
                                history.push("/");
                            }
                        }).catch(e => {
                            console.log("HELLO" + e);
                            return null;
                        })
                        const res = upgrade();
                    }, 1000);
                }
            }).catch(e => {
                console.log("error getting temp token" + e);
                return null;
            })



        getTempToken();

        return () => clearInterval(timer);

    }, []);

    return (
        <div className={classes.root}>
            <div>Verifying...</div>
            <LinearProgress />
            {/* {valid === 'loggedin' && <Redirect to="/" />}
            {valid === 'needssignup' && <Redirect to="/signup" />} */}
        </div>
    );
}
