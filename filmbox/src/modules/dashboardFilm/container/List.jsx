import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';

import {UploadFile,InputFileArrea} from '../componets/UploadMovie';

import CommentaryBox from '../container/CommentaryBox';
import Navigation from '../../navigation/Navigation';

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
      videoLoaded:false,
      noFiles: 3,
      //noFiles: 6,
      listId: ["5ef5054036d1a00001ac29df", "5ef5054136d1a00001ac29e0","5ef5054236d1a00001ac29e1"]
     //listId: ["5ee491f932b84f060057fadb","5ee491fb32b84f060057fadc","5ee491fc32b84f060057fadd","5ee491fd32b84f060057fade","5ee491fd32b84f060057fadf","5ee4920132b84f060057fae0"]
    }
  };

  componentDidMount() {
    if(this.props.allIdChunck.length>0)
    {
      this.state.noFiles=this.props.allIdChunck.length;
      this.state.listId= this.props.allIdChunck
    }
    var videoLoaded={loaded:false};
    var queue = [];
    this.fetch( 0, queue, videoLoaded)
    //this.newFetch(0,queue,videoLoaded);

    setTimeout(() => {
      
      queue=this.toQueue(queue);
      if(videoLoaded.loaded)
      {
        return;
      }
      videoLoaded.loaded=true;
        console.log("Started from time out")
      this.state.video = document.getElementById('myVideo');
      this.state.video.crossOrigin = 'anonymous';

      if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
        this.state.mediaSource = new MediaSource;
        this.state.video.src = URL.createObjectURL(this.state.mediaSource);
        this.state.mediaSource.addEventListener('sourceopen', () => this.sourceOpen(queue));
      } else {
        console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
      }
    }, 10000);
  }

   playVideo =(queue)=>{

      queue=this.toQueue(queue); 
      console.log("Started from play video")
      this.state.video = document.getElementById('myVideo');
      this.state.video.crossOrigin = 'anonymous';

      if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
        this.state.mediaSource = new MediaSource;
        this.state.video.src = URL.createObjectURL(this.state.mediaSource);
        this.state.mediaSource.addEventListener('sourceopen', () => this.sourceOpen(queue));
      } else {
        console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
      }
  }

  sourceOpen = (queue) => {
    console.log(queue);
    var newMediaSource = this.state.mediaSource;
    this.state.sourceBuffer = newMediaSource.addSourceBuffer(this.state.mimeCodec);
    if(queue.length)
      this.state.sourceBuffer.appendBuffer(queue.shift());

    this.state.sourceBuffer.addEventListener('updateend', () => {
      if (queue.length) {
        this.state.sourceBuffer.appendBuffer(queue.shift());
      }
    }, false);
  };

  fetch = (index,queue,videoLoaded) => {
  
    var url = `http://localhost:8088/mongo/video?video=${this.state.listId[index]}`;
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"))
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      queue.push(xhr.response);
      index++;
      if (index == (this.state.noFiles-1))
      {
        if(videoLoaded.loaded==false){
          this.playVideo(queue);
          videoLoaded.loaded=true;
        }
        return;
      }
      this.fetch( index ,queue, videoLoaded);
    };
    xhr.send();
  };

  newFetch= (index,dictionary,videoLoaded) =>{
    var url = `http://localhost:8088/mongo/video?video=${this.state.listId[index]}`;
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"))
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      dictionary[index]=xhr.response;
      console.log("new fetch",dictionary);
      if(dictionary.length==(this.state.noFiles-1)){
        if(videoLoaded.loaded==false){
          this.playVideo(dictionary);
          videoLoaded.loaded=true;
        }
      }
    }
    xhr.send();
    if (index == (this.state.noFiles-2))
      return;
    setTimeout(()=>{this.newFetch(index+1, dictionary,videoLoaded)},500);
  }

  toQueue =(dictionary)=>{
    var queue = [];
    for(var i=0 ;i<dictionary.length;i++)
    {
      if(dictionary[i]!==undefined)
      {
        queue.push(dictionary[i]);
      }
      else
        break;
    }
    return queue;
  }

  formatNumber(number) {
    if (number < 10)
      return `00${number}`;
    else
      if (number < 100)
        return `0${number}`;
      else
        return `${number}`;
  }


  // playVideo (){
  //   console.log("play   .............");
  // }

  render() {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <UploadFile></UploadFile>
        <InputFileArrea>
          <MyVideo
            id="myVideo"
            autoplay="false"
            muted="muted"
            controls="true"
            //onPlay={this.playVideo}
            >
          </MyVideo>
        </InputFileArrea>
        <InputFileArrea>
          <CommentaryBox></CommentaryBox>
        </InputFileArrea>
      </React.Fragment>
    )
  };

}
const mapStateToProps = state => ({
  allIdChunck: state.notification.notification.allIdChunck
});

export default connect(mapStateToProps,null)(List)  
 // playVideo =()=>{
  //   console.log("play   .............");
  //   var queue = [];
  //   this.fetch( 0, queue)

  //   setTimeout(() => {
  //     this.state.video = document.getElementById('myVideo');
  //     this.state.video.crossOrigin = 'anonymous';

  //     if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
  //       this.state.mediaSource = new MediaSource;
  //       this.state.video.src = URL.createObjectURL(this.state.mediaSource);
  //       this.state.mediaSource.addEventListener('sourceopen', () => this.sourceOpen(queue));
  //     } else {
  //       console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
  //     }

  //   }, 2000);
  // }
