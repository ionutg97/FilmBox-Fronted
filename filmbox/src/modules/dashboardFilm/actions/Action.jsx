import axios from "axios";

import {POST,GET} from '../../common/utils';

export const uploadVideo = (pathMovie) => {
    return dispatch => {
      let api = `http://localhost:8084/split_movie?pathFileName=${pathMovie}`;
      return axios
      .post(api)
        .then(response => {
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

export const getNumber = (idMovie) =>{
  GET(`http://localhost:8087/comment/number/${idMovie}`)
  .then(response => {
   // response.data;
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
} 

export const getAllComm = (idMovie) =>{
  GET(`http://localhost:8087/comment/${idMovie}`)
  .then(response => {
   // response.data
   console.log(response)
  })
  .catch(err => {
    console.log(err);
  });
} 

