process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;    
import axios from "axios";
const APIKEY = "20fa73f1"; 
const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };

    const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString);
    returnObject.datos = apiResponse.data.Search;  
    returnObject.respuesta=apiResponse.data.Response;
    returnObject.cantidadTotal = apiResponse.data.totalResults;
    return returnObject;
};

const OMDBSearchComplete = async (searchText, page=1) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};
const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const apiResponse = await axios.get(requestString);
    returnObject.datos = apiResponse.data.Search;
    returnObject.respuesta=apiResponse.data.Response;  
    returnObject.cantidadTotal = apiResponse.data.totalResults;
    return returnObject;
};
const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
respuesta : false,
datos : {}
};
const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const apiResponse = await axios.get(requestString);
    returnObject.datos = apiResponse.data;
    returnObject.respuesta=apiResponse.data.Response;
    return returnObject;
    };

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};


