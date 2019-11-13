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
      // mimeCodec : 'video/mp4; codecs="avc1.4D401F"',
      //mimeCodec : 'video/webm; codecs="vorbis,vp9"',
      mimeCodec: "video/webm;codecs=vp8,opus",
      mediaSource: null,    // mediaSource.readyState === 'closed'
      video: null,
      sourceBuffer: null,
      queue: [],
      url: null,
      stop: false,
      noFiles: 3
    }
  };

  componentDidMount() {
    console.log(MediaSource.isTypeSupported(this.state.mimeCodec));
    this.state.video = document.getElementById('myVideo');
    this.state.video.crossOrigin = 'anonymous';

    if ('MediaSource' in window && MediaSource.isTypeSupported(this.state.mimeCodec)) {
      this.state.mediaSource = new MediaSource;
      //console.log(mediaSource.readyState); // closed
      this.state.video.src = URL.createObjectURL(this.state.mediaSource);
      this.state.mediaSource.addEventListener('sourceopen', this.sourceOpen);
    } else {
      console.error('Unsupported MIME type or codec: ', this.state.mimeCodec);
    }


    // Attach media source to video element
    //this.state.video.src = URL.createObjectURL(this.state.mediaSource);

    // Wait for media source to be open
    //this.state.mediaSource.addEventListener('sourceopen', this.handleSourceOpen.bind(this));
    //console.log(this.state);

    //const script = document.createElement("script");

    //script.src = "https://cdn.dashjs.org/latest/dash.all.min.js";
    //script.async = true;

    //document.body.appendChild(script);

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

  handleSourceOpen() {
    //var mediaSource = this; // mediaSource.readyState === 'open'
    //this.state.sourceBuffer = this.state.mediaSource.addSourceBuffer(this.state.mimeCodec);


    let i = 2;
    while (i <= this.state.noFiles) {
      this.state.queue.push(`http://localhost:8081/catalog/movie/out2.webm.${this.formatNumber(i)}`);
      i++;

    }
    //this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-0.dash");
    //this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-25600.dash");
    //this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-51200.dash");

    // this.state.mediaSource.duration = 6; // (51200 + 25600) / 12800

    // Fetch init segment (contains mp4 header)
    //this.fetchSegmentAndAppend("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000.dash",
    // this.fetchSegmentAndAppend("http://localhost:8081/catalog/movie/out2.webm.001",this.state.sourceBuffer,()=> {this.iter();});
    //this.state.mediaSource.endOfStream();
    //this.state.video.play();
    // var playPromise = this.state.video.play();

    // if (playPromise !== undefined) {
    //   playPromise
    //     .then(_ => {
    //       // Automatic playback started!
    //       // Show playing UI.
    //       console.log("audio played auto");
    //     })
    //     .catch(error => {
    //       // Auto-play was prevented
    //       // Show paused UI.
    //       console.log("playback prevented");
    //     });
    // }
  }



  sourceOpen = () => {
    //console.log(this.readyState); // open
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



  fetchSegmentAndAppend = (segmentUrl, sourceBuffer, callback) => {
    this.fetchArrayBuffer(segmentUrl, (buf) => {
      console.log("here", sourceBuffer);

      sourceBuffer.addEventListener('updateend', (ev) => {
        console.log('updateend: ' + this.state.mediaSource.readyState);
        callback();
      });
      sourceBuffer.addEventListener('error', (ev) => {
        console.log('error: ' + this.state.mediaSource.readyState);
        callback(ev);
      });
      sourceBuffer.addEventListener('updatestart', (e) => { console.log('updatestart: ' + this.state.mediaSource.readyState); });
      sourceBuffer.addEventListener('update', (e) => { console.log('update: ' + this.state.mediaSource.readyState); });
      sourceBuffer.addEventListener('abort', (e) => { console.log('abort: ' + this.state.mediaSource.readyState); });

      sourceBuffer.appendBuffer(buf)
      //   new Promise((resolve, reject) => {
      //     console.log('Initial');

      //     setTimeout(() => resolve(
      //       sourceBuffer.appendBuffer(buf)
      //     ), 4000);

      // })
      // .then(() => {
      //     callback();
      // })

      //   if (
      //     this.state.mediaSource.readyState === "open" &&
      //     this.state.sourceBuffer &&
      //     this.state.sourceBuffer.updating === false
      // )



      //console.log(sourceBuffer);  
    });
  }

  iter = () => {

    // Pop segment from queue
    this.state.url = this.state.queue.shift();
    if (this.state.url === undefined) {
      return;
    }

    // Download segment and append to source buffer
    this.fetchSegmentAndAppend(this.state.url, this.state.sourceBuffer, (err) => {
      console.log("url ", this.state.url);
      if (err) {
        console.error(err);
      } else {
        setTimeout(this.iter, 200);
      }
    });
  }

  fetchArrayBuffer = (url, callback) => {
    console.log("url ", url);
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      //console.log(xhr.response);
      callback(xhr.response);
    };
    xhr.send();
  }

  //   getMPD(){
  //     let url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";
  //     var player = dashjs.MediaPlayer().create();
  //     player.initialize(document.querySelector("#videoPlayer"), url, true);
  // }

  render() {
    return (
      <React.Fragment>

        <MyVideo
          id="myVideo"
          autoplay="false"
          muted="muted"
          controls="true">
        </MyVideo>

        {/* <MyVideo
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                autoplay="false"
                muted="muted"
	              controls="true"
               >
                 </MyVideo> */}



        {/* <video 
                data-dashjs-player
                autoplay="false"
                muted="muted"
                 //src="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" 
                src="http://localhost:8081/catalog/downloadFile/out.mpd"
                 controls="true">
                  
                 </video> */}


      </React.Fragment>
    )
  };

}
export default List