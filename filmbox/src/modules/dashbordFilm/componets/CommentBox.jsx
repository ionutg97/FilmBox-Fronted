import React from 'react';
import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"
import { Client } from '@stomp/stompjs';

export class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stompClient: null,
            client: null
        }
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
        this.state.stompClient.send("/app/comment", {},
            JSON.stringify({ 'content': text, 'idUser': 6789, 'idMovie': 12345 }));
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
                        <input type="text" id="from" placeholder="Choose a nickname" />
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
export default CommentBox;