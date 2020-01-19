import React from 'react'
import BottomBar from '../components/BottomBar.js'
import config from '../config.js'
import './Chat.css';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphY29iQHJlY2toYXJkLmNhIiwiaWQiOjEsImlzZnVsbCI6dHJ1ZX0.1GKdrDlvbCOOey9OPfbgRB2RNMwso6ryDQeezbkpW-"

class Header extends React.Component {
  render() {
    return <h1 className="chat-header"> { this.props.title } </h1>;
  }
}


function ChatStrip (props) {
  return (
    <div className="hor spread card chatstrip">
      <div className="img">
        <img src="https://www.circleofdocs.com/wp-content/uploads/2015/02/Circle-of-Docs-1400x1400-px.jpg" height="50" width="50"/>
      </div>
      <div className="items">
        <h2>{props.user}</h2>
        <p>{props.msg}</p>
      </div>
    </div>
  )
}

// Screen showing list of users
class ChatScreen extends React.Component {
  render() {
    return (
      <div>
        <Header title="Chat"/>
        <ChatStrip user="Testy McTestface" msg="Hey, my friend, how have you..."/>
        <ChatStrip user="Testy Mctesterson" msg="Hello, are you interested in..."/>
        <ChatStrip user="Testeresta Testera" msg="Sup good looking"/>
      </div>
    )
  }
}




// Screen when a user is selected to chat with
class ChattingScreen extends React.Component {
  render() {
    return <Header title={this.props.screen}/>
  }
}





export default class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      screen: null
    }

    // TODO: use this for getting list of users
    fetch(`${config.API}/matches`, {
      method: 'post',
      headers: {'Authorization': token},
      body: { email: "ahh" },
    }).then((response) => {
      return console.log(response)
    });
  }

  render() {
    if (this.state.screen === null) {
      return (
        <>
          <ChatScreen />
          <BottomBar/>
        </>
      )
    } else {
      return (
        <>
          <ChattingScreen screen={this.state.screen}/>
          <BottomBar/>
        </>
      )
    }
  }
}
