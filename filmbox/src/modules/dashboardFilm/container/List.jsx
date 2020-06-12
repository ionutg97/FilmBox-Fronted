import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import {UploadFile} from '../componets/UploadMovie';
import CommentaryBox from '../container/CommentaryBox';

const MyVideo = styled.video`
    width: 640px;
    height: 360px;
    border: solid 1px; 
    display: flex;
    justify-content: center;
    align-items: center;
`;


export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mimeCodec: "video/webm;codecs=vp8,opus",
      mediaSource: null,
      video: null,
      sourceBuffer: null,
      // noFiles: 0,
      // listId:[]
      noFiles: 6,
     // listId: ["5eac06f6d9aece2920f4bcc3", "5eac06f7d9aece2920f4bcc4"]
     listId: ["5eb860e9ad92f02084c8025d","5eb860ebad92f02084c8025e","5eb860ebad92f02084c8025f","5eb860eead92f02084c80260","5eb860eead92f02084c80261","5eb860f0ad92f02084c80262"]
    }
  };

  componentDidMount() {
    if(this.props.allIdChunck.length>0)
    {
      this.state.noFiles=this.props.allIdChunck.length;
      this.state.listId= this.props.allIdChunck
    }

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
      queue.push(xhr.response);
      index++;
      if (index == (this.state.noFiles))
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

        <CommentaryBox></CommentaryBox>
        
      </React.Fragment>
    )
  };

}
const mapStateToProps = state => ({
  allIdChunck: state.notification.notification.allIdChunck
});

export default connect(mapStateToProps,null)(List)  