import {TOTAL_RESULTS, ALL_TYPES, ALL_POKEMONS} from '../../constants'
import callApi from '../../ApiCaller';
import axios from "axios/index";

export function getTotalResults(url) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            return callApi(url).then((res) =>{
                getPokemon(res.data.results).then(resp => {
                    dispatch({
                        type: ALL_POKEMONS,
                        payload: resp
                    });
                    dispatch(totalResultResponse(res.data));
                    return resolve(resp);
                })
            });
        });
    };
}

export function getPokemon(res) {
    const axiosArray = [],speciesArray = [];
    res.map((e, index) => {
        axiosArray.push(axios.get(e.url));
    });
    return Promise.all(axiosArray).then((allResp) => {
        let dataArray = [];
        allResp.map((resp) => {
            speciesArray.push(axios.get(resp.data.species.url));
            dataArray.push(resp.data);
        });
        return Promise.all(speciesArray).then((speciesRespArray) => {
            speciesRespArray.map((speciesRes,key) => {
                dataArray[key].color = speciesRes.data.color.name;
            });
            return dataArray;
        });
    });
}
export function totalResultResponse(res) {
    return {
        type: TOTAL_RESULTS,
        payload: res
    }
}

export function getTypeResults() {
    return (dispatch) => {
        return callApi('/pokemon-color').then((res) =>{
            dispatch(typeResultResponse(res.data.results));
        });
    };
}

export function typeResultResponse(res) {
    return {
        type: ALL_TYPES,
        payload: res
    }
}

export function allPokemonResp(res) {
    return {
        type: ALL_POKEMONS,
        payload: res
    }
}

