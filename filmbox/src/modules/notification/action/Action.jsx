import {GET} from '../../common/utils';

export const getMovies = () => {
    return dispatch => {
      let api = `http://localhost:8086/movie`;
      return GET(api)
        .then(response => {
            console.log(response.data);
          dispatch({
            type: "GET_MOVIES",
            payload: { movies: response.data }
          });
        })
        .catch(error =>
          dispatch({
            
          })
        );
    };
  };