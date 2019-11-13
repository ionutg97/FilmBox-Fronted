import React from "react";
import styled from "styled-components";

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
      noFiles: 3
    }
  };

  componentDidMount() {
    this.state.video = document.getElementById('myVideo');
    this.state.video.crossOrigin = 'anonymous';

    if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
      this.state.mediaSource = new MediaSource;
      this.state.video.src = URL.createObjectURL(this.state.mediaSource);
      this.state.mediaSource.addEventListener('sourceopen', this.sourceOpen);
    } else {
      console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
    }
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

  sourceOpen = () => {
    let i = 1;
    var queue = [];
    let generateUrl = `http://localhost:8081/catalog/movie/out2.webm.${this.formatNumber(i)}`;
    this.fetch(generateUrl, i, (buf, index) => {

      queue.push(buf);
      //queue[index] = buf;
      //console.log(queue.slice(0));

    });

    setTimeout(() => {
      var newMediaSource = this.state.mediaSource;
      this.state.sourceBuffer = newMediaSource.addSourceBuffer(this.state.mimeCodec);
      //queue.shift();
      this.state.sourceBuffer.appendBuffer(queue.shift());

      this.state.sourceBuffer.addEventListener('updateend', () => {
        if (queue.length) {
          this.state.sourceBuffer.appendBuffer(queue.shift());
        }
      }, false);
    }, 2000);


  };

  fetch = (url, index, addToQueue) => {
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      addToQueue(xhr.response, index);
      let generateUrl = `http://localhost:8081/catalog/movie/out2.webm.${this.formatNumber(index + 1)}`;

      if (index == this.state.noFiles)
        return;
      this.fetch(generateUrl, index + 1, addToQueue)
    };
    xhr.send();
  };


  render() {
    return (
      <React.Fragment>
        <MyVideo
          id="myVideo"
          autoplay="false"
          muted="muted"
          controls="true">
        </MyVideo>
      </React.Fragment>
    )
  };

}
export default List