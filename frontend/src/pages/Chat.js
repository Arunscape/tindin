import React, { useState, useEffect } from 'react'
import BottomBar from '../components/BottomBar.js'
import config from '../config.js'
import './Chat.css';

const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImphY29iQHJlY2toYXJkLmNhIiwiaWQiOjEsImlzZnVsbCI6dHJ1ZX0.uWePnCAsXWhX45WpHBskghob-D26NhWCcIvxeGPXh-U"

const Header = (props) => <h1 className="chat-header"> {props.title} </h1>


const ChatStrip = (props) => (
  <div className="hor spread card chatstrip">
    <div className="img">
      <img src="https://www.circleofdocs.com/wp-content/uploads/2015/02/Circle-of-Docs-1400x1400-px.jpg" height="50" width="50" />
    </div>
    <div className="items">
      <h2>{props.user}</h2>
      <p>{props.msg}</p>
    </div>
  </div>
)

// Screen showing list of users
const ChatScreen = () => (
  <div>
    <Header title="Chat" />
    <ChatStrip user="Testy McTestface" msg="Hey, my friend, how have you..." />
    <ChatStrip user="Testy Mctesterson" msg="Hello, are you interested in..." />
    <ChatStrip user="Testeresta Testera" msg="Sup good looking" />
  </div>
)




// Screen when a user is selected to chat with
const ChattingScreen = (props) => <Header title={props.screen} />






const Chat = () => {
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    // TODO: use this for getting list of users
    const getUsers = async () => {
      fetch(`${config.API}/matches`, {
        headers: { 'Authorization': token },
        "Content-Type": "application/json",
      })
        // .then((response) => response.json())
        .then(response => {
          console.log(response)
          setScreen(null);
        });
    }

    getUsers();
  }, [])


  return screen ? (<>
    <ChattingScreen screen={screen} />
    <BottomBar />
  </>) : (
      <>
        <ChatScreen />
        <BottomBar />
      </>
    )
}

export default Chat;