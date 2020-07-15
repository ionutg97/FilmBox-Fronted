import axios from "axios";

import {POST,GET,DELETE} from '../../common/utils';

export const uploadVideo = (pathMovie) => {
 
  let pathFileResult= "";
  for(var i=0; i<pathMovie.length; i++)
  {
    var char = pathMovie.charAt(i);
    if(char=='\\')
      pathFileResult+="/";
    else
      pathFileResult+=char;
  }
  console.log(pathFileResult)

    return dispatch => {
      let api = `http://localhost:8084/split_movie?pathFileName=${pathFileResult}`;
      POST(api)
        .then(response => {
         // console.log(response.data)
          if(response.data.videoId)
            dispatch({
              type: "UPLOAD SUCCES",
              payload: {
                uploadVideo:true
              }
          })
        })
        .catch(error =>
          dispatch({
            type:"ERROR",
            payload: error
          })
        );
    };
  };

export const saveComment = (content,idUser,idMovie) =>{
  console.log("saveComment ", content,idUser,idMovie);
  POST(`http://localhost:8087/comment`,
         {
          "content":content,
          "idUser":idUser,
          "idMovie":idMovie
        })
  .then(response => {
  })
  .catch(err => {
    console.log(err);
  });
} 

export const getNumberComm = (idMovie) =>{
  return dispatch => {
  GET(`http://localhost:8087/comment/number/${idMovie}`)
    .then(response => {
        console.log("getNumber",response.data)
        dispatch({
          type: "COMM_NUMBER",
          payload: {
            numberComm: response.data
          }
      })
    })
    .catch(err => {
      console.log(err);
    });
  } 
}

export const getAllComm = (idMovie) =>{
  return dispatch => {
    GET(`http://localhost:8087/comment/${idMovie}`)
      .then(response => {
      //console.log("getAllComm",idMovie," ",response.data)
      dispatch({
        type: "COMMENTS",
        payload: {
          comments: response.data
        }
      })
      })
      .catch(err => {
        console.log(err);
      });
    } 
}

export const deleteComm = (idComm) => {
  console.log("delete comm ",idComm)
  DELETE(`http://localhost:8087/comment/${idComm}`)
  .then(response => {
  })
  .catch(err => {
    console.log(err);
  });
}

