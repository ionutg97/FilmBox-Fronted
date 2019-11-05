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
        mimeCodec : 'video/mp4; codecs="avc1.4D401F"',
        mediaSource :new MediaSource(),    // mediaSource.readyState === 'closed'
        vide : null,
        sourceBuffer : null,
        queue : [],
        url : null,
        stop: false


        }
    };

    componentDidMount(){
      //   console.log(MediaSource.isTypeSupported(this.state.mimeCodec));
      //   this.state.video = document.getElementById('myVideo');
        
      //   // Attach media source to video element
      //   this.state.video.src = URL.createObjectURL(this.state.mediaSource);

      //   // Wait for media source to be open
      //  this.state.mediaSource.addEventListener('sourceopen', this.handleSourceOpen.bind(this));
      // //console.log(this.state);

      const script = document.createElement("script");

      script.src = "https://cdn.dashjs.org/latest/dash.all.min.js";
      script.async = true;
  
      document.body.appendChild(script);

    }

    

     handleSourceOpen() {
      //var mediaSource = this; // mediaSource.readyState === 'open'
      this.state.sourceBuffer = this.state.mediaSource.addSourceBuffer(this.state.mimeCodec);

     
      this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-0.dash");
      this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-25600.dash");
      this.state.queue.push("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000-51200.dash");

      this.state.mediaSource.duration = 6; // (51200 + 25600) / 12800

      // Fetch init segment (contains mp4 header)
      this.fetchSegmentAndAppend("https://testcontent.eyevinn.technology/mse-tutorial/vinn-video=1660000.dash",
       this.state.sourceBuffer, ()=> {

       
        this.iter();
        this.state.video.play();
      });
    }


    fetchSegmentAndAppend(segmentUrl, sourceBuffer, callback) {
      this.fetchArrayBuffer(segmentUrl, function(buf) {
        sourceBuffer.addEventListener('updateend', function(ev) {
          callback();
        });
        sourceBuffer.addEventListener('error', function(ev) {
          callback(ev);
        });
        sourceBuffer.appendBuffer(buf);
      });
    }
    
    iter =() =>{

      // Pop segment from queue
      this.state.url = this.state.queue.shift();
      if (this.state.url === undefined) {
        return;
      }

      // Download segment and append to source buffer
      this.fetchSegmentAndAppend(this.state.url, this.state.sourceBuffer, (err)=> {
        if (err) {
          console.error(err);
        } else {
          setTimeout(this.iter, 200);
        }
      });
    }

    fetchArrayBuffer(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
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
              
                {/* <MyVideo 
                id="myVideo"
                autoplay="false"
                muted="muted"
	              controls="true">
                </MyVideo> */}
                
                {/* <MyVideo
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                autoplay="false"
                muted="muted"
	              controls="true"
               >
                 </MyVideo> */}

               
        
                <video 
                data-dashjs-player
                autoplay="false"
                muted="muted"
                 src="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" 
                 controls="true">
                  
                 </video>
                 
                
            </React.Fragment>
        )};

}
export default List