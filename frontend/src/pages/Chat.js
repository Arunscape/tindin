import React, { useState, useEffect } from 'react'
import BottomBar from '../components/BottomBar'
import config from '../config.js'
import './Chat.css';
import useGlobalState from '../useGlobalState';


const Chat = () => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    // TODO: use this for getting list of users
    const getUsers = async () => {
      fetch(`${config.API}/matches`, {
        headers: { 'Authorization': localStorage.getItem('userToken') },
        "Content-Type": "application/json",
      })
        // .then((response) => response.json())
        .then(response => response.json())
        .then(data => setMatches(data));
    }

    getUsers();
  }, [])

  useEffect(() => {
    console.log(matches)
  }, [matches])


  return <>

    {matches && matches.map(m => <div>{JSON.stringify(m)}</div>)}
  </>
}

export default Chat;