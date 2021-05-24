import './App.scss';
import React from 'react';
import Chat from './components/chat/Chat'
import Home from './components/home/Home'
import Process from './components/process/Process'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from 'socket.io-client'

const DEV_DOMAIN = 'http://localhost:8000';
const PUB_DOMAIN = '';


const socket = io(DEV_DOMAIN);

const AppMain = (props) => {
  return (
    <React.Fragment>
        <div className="right">
          <Chat
            username={props.match.params.username}
            roomname={props.match.params.roomname}
            socket={socket}
          />
        </div>
        <div className="left">
          <Process />
        </div>
    </React.Fragment>
  )
}


function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Home socket={socket} />
            </Route>
            <Route 
            path="/chat/:roomname/:username"      
            component={AppMain} />
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
