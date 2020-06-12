import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
    
import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"
import { Client } from '@stomp/stompjs';

export class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stompClient: null,
            client: null,
            nameClient:null
        }
    }

    componentDidMount=()=>{
        this.getProfile();
    }

    getProfile = () => {
          console.log("gete",localStorage.getItem("loggedUserId"))
          return axios
          .get(`http://localhost:8091/user/${localStorage.getItem("loggedUserId")}/profile`, {
              headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` }
          })
          .then(response => {
             this.state.nameClient = response.data.name; 
          })
          .catch(err => {
            console.log(err);
          });
    } 
      

    connect = () => {
        var Stomp = require('stompjs');
        console.log("here", Stomp);


        this.state.stompClient = Stomp.client('ws://localhost:8087/replay');
        this.state.stompClient.connect({}, (frame) => {
            this.setConnected(true);
            console.log('Connected: ' + frame);
            this.state.stompClient.subscribe('/topic/comment', (messageOutput) => {
                this.showMessageOutput(JSON.parse(messageOutput.body));
            });
        }, function (error) {
            console.log(error);
        });
        console.log("finale", this.state.stompClient);
    }

    setConnected = (connected) => {
        document.getElementById('connect').disabled = connected;
        document.getElementById('disconnect').disabled = !connected;
        document.getElementById('conversationDiv').style.visibility
            = connected ? 'visible' : 'hidden';
        document.getElementById('response').innerHTML = '';
    }

    // disconnect =()=> {
    //     if(this.state.stompClient != null) {
    //         this.state.stompClient.disconnect();
    //     }
    //     this.setConnected(false);
    //     console.log("Disconnected");
    // }

    sendMessage = () => {
        var from = document.getElementById('from').value;
        var text = document.getElementById('text').value;
        console.log(this.state.nameClient)
        this.state.stompClient.send("/app/comment", {},
            JSON.stringify({ 'content': text, 'idUser':from, 'idMovie': 12345 }));
    }

    showMessageOutput = (messageOutput) => {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        console.log("Am primit mesajul ", messageOutput);
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(messageOutput.idUser + ": " + messageOutput.content));
        //p.appendChild(document.createTextNode(messageOutput.content));

        response.appendChild(p);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div>
                        <input type="text" id="from" placeholder="Choose a nickname">{this.state.nameClient}</input>
                    </div>
                    <br />
                    <div>
                        <button id="connect" onClick={this.connect}>Connect</button>
                        <button id="disconnect" disabled="disabled" onclick={""}>
                            Disconnect
                </button>
                    </div>
                    <br />
                    <div id="conversationDiv">
                        <input type="text" id="text" placeholder="Write a message..." />
                        <button id="sendMessage" onClick={this.sendMessage}>Send</button>
                        <p id="response"></p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    movies: state.notification.notification.movies
  });
export default connect(mapStateToProps, null)
(ChatBox);