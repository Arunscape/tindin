import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useHistory } from 'react-router';
import useGlobalState from '../useGlobalState';

const Text = styled.input`
border: none;
font: bold italic 7vw Open Sans;
background-color: #FFFFFFFF00;
color: white;
border-bottom: 0.2rem solid white;
`;

export default function UploadButtons() {
    const classes = useStyles();
    const history = useHistory();

    const { setLoggedIn } = useGlobalState();

    const [images, setImages] = useState(["", "", "", "", ""]);

    return (
        <div>

            <Text onChange={(e) => setImages(i => i[0] = e.target.value)} />
            <Text onChange={(e) => setImages(i => i[1] = e.target.value)} />
            <Text onChange={(e) => setImages(i => i[2] = e.target.value)} />
            <Text onChange={(e) => setImages(i => i[3] = e.target.value)} />
            <Text onChange={(e) => setImages(i => i[4] = e.target.value)} />



            <button onClick={() => {

                window.isForSignup = true;
                window.images = images;

                history.push("/signin-verify");
                setLoggedIn(true);

            }}>Next</button>
        </div>
    );
}
