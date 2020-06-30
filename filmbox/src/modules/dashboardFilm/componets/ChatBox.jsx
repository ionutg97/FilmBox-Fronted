import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
//import { NativeModules, Platform } from 'react-native'   

import SockJS from "sockjs-client"
import Stomp from "@stomp/stompjs"
import { Client } from '@stomp/stompjs';
import Navigation from '../../navigation/Navigation';
import {InputFileArrea} from '../componets/UploadMovie';


export class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stompClient: null,
            client: null,
            nameClient:null,
            //Aes:NativeModules.Aes,
            key:null 
        }
    }

    componentDidMount=()=>{
        //this.generateKey("film","film","",128)
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
      
 
    // generateKey = (password, salt, cost, length) => {
    //    this.state.key=NativeModules.Aes.pbkdf2(password, salt, cost, length);
    // }
     
    // encryptData = (text, key) => {
    //     return NativeModules.Aes.randomKey(16).then(iv => {
    //         return NativeModules.Aes.encrypt(text, key, iv).then(cipher => ({
    //             cipher,
    //             iv,
    //         }))
    //     })
    // }

    // decryptData = (encryptedData, key) => NativeModules.Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)
 
// try {
//     generateKey('Arnold', 'salt', 5000, 256).then(key => {
//         console.log('Key:', key)
//         encryptData('These violent delights have violent ends', key)
//             .then(({ cipher, iv }) => {
//                 console.log('Encrypted:', cipher)
 
//                 decryptData({ cipher, iv }, key)
//                     .then(text => {
//                         console.log('Decrypted:', text)
//                     })
//                     .catch(error => {
//                         console.log(error)
//                     })
 
//                 Aes.hmac256(cipher, key).then(hash => {
//                     console.log('HMAC', hash)
//                 })
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     })
// } catch (e) {
//     console.error(e)
// }

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
        //console.log(this.state.nameClient)
       // console.log(this.encryptData(text,this.state.key)," ->>> ",this.state.key)
        this.state.stompClient.send("/app/comment", {},
            JSON.stringify({ 'content': text, 'idUser':localStorage.getItem("loggedUserId"), 'idMovie': 12345 }));
        document.getElementById('text').innerHTML="";    
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
                <Navigation/>
                <InputFileArrea>
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
                </InputFileArrea>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    movies: state.notification.notification.movies
  });
export default connect(mapStateToProps, null)
(ChatBox);