import React from "react";
import styled from "styled-components";
import base64 from 'react-native-base64';
import {UploadFile} from '../componets/UploadMovie';

const MyVideo = styled.video`
    width: 640px;
    height: 360px;
    border: solid 1px; 
`;


export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mimeCodec: "video/webm;codecs=vp8,opus",
      mediaSource: null,
      video: null,
      sourceBuffer: null,
      noFiles: 2,
      listId: ["5eac06f6d9aece2920f4bcc3", "5eac06f7d9aece2920f4bcc4"]
    }
  };

  componentDidMount() {
    var queue = [];
    this.fetch( 0, queue)

    setTimeout(() => {
      this.state.video = document.getElementById('myVideo');
      this.state.video.crossOrigin = 'anonymous';

      if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
        this.state.mediaSource = new MediaSource;
        this.state.video.src = URL.createObjectURL(this.state.mediaSource);
        this.state.mediaSource.addEventListener('sourceopen', () => this.sourceOpen(queue));
      } else {
        console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
      }

    }, 5000);
  }

  playVideo (){
    console.log("play   .............");
    var queue = [];
    this.fetch( 0, queue)

    setTimeout(() => {
      this.state.video = document.getElementById('myVideo');
      this.state.video.crossOrigin = 'anonymous';

      if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
        this.state.mediaSource = new MediaSource;
        this.state.video.src = URL.createObjectURL(this.state.mediaSource);
        this.state.mediaSource.addEventListener('sourceopen', () => this.sourceOpen(queue));
      } else {
        console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
      }

    }, 2000);
  }

  sourceOpen = (queue) => {
    console.log(queue);
    var newMediaSource = this.state.mediaSource;
    this.state.sourceBuffer = newMediaSource.addSourceBuffer(this.state.mimeCodec);
    //queue.shift();cd
    this.state.sourceBuffer.appendBuffer(queue.shift());

    this.state.sourceBuffer.addEventListener('updateend', () => {
      if (queue.length) {
        this.state.sourceBuffer.appendBuffer(queue.shift());
      }
    }, false);
  };

  fetch = (index,queue) => {
    var url = `http://localhost:8088/mongo/video?video=${this.state.listId[index]}`;
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"))
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
     // var chunk = window.atob(xhr.response);
      //var arrayBuff=this.str2ab(chunk);
      queue.push(xhr.response);
      index++;
      if (index == this.state.noFiles)
        return;
      this.fetch( index ,queue);
    };
    xhr.send();
  };

  formatNumber(number) {
    if (number < 10)
      return `00${number}`;
    else
      if (number < 100)
        return `0${number}`;
      else
        return `${number}`;
  }


  playVideo (){
    console.log("play   .............");
  }

  render() {
    return (
      <React.Fragment>
        <UploadFile></UploadFile>
         <MyVideo
          id="myVideo"
          autoplay="false"
          muted="muted"
          controls="true"
          onPlay={this.playVideo}>
        </MyVideo>
        {/* <MyVideo
          id="myVideo2"
          autoplay="false"
          muted="muted"
          controls="true"
          onPlay={this.playVideo}>
        </MyVideo> */}
      </React.Fragment>
    )
  };

}
export default List