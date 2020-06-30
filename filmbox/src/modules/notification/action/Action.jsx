import {GET} from '../../common/utils';

export const getMovies = () => {
    return dispatch => {
      let api = `http://localhost:8086/movie`;
      return GET(api)
        .then(response => {
          dispatch({
            type: "GET_MOVIES",
            payload: { movies: response.data }
          });
        })
        .catch(error =>
          dispatch({
            type:"ERROR",
            payload: error
          })
        );
    };
  };

  export const getAllIdChunck = (idMovie,props) => {
    return dispatch => {
      let api = `http://localhost:8088/mongo?video=${idMovie}`;
      return GET(api)
        .then(response => {
          dispatch({
            type: "GET_ALL_ID_CHUNCKS",
            payload: { 
              allIdChunck: response.data,
              idMovie: idMovie 
             }
          });
          props.history.push("/account/video")
        })
        .catch(error =>
          dispatch({
            type:"ERROR",
            payload: error
          })
        );
    };
  };

  export const getUserInfoById = (id) => {
    console.log("id ->",id)
     GET(`http://localhost:8091/user/${id}/profile`)
      .then(response => { 
       console.log(response.data)
       return response.data
      })
      .then(data =>{
        var obj = JSON.parse(data)
        console.log("dsa",obj)
        return obj;
      })
      .catch(err => {
        console.log(err);
       // return 0;
      });
  }
