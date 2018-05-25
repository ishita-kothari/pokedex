import {TOTAL_RESULTS, ALL_TYPES, ALL_POKEMONS} from "../constants";

const DEFAULT_STATE = {
   totalResult : [],
    typeResult: [],
    allPokemon: [],
    random:Math.random(),
}

export default (state = DEFAULT_STATE, {type, payload}) => {
    switch (type) {
        case TOTAL_RESULTS:
            return {
                ...state, totalResult: payload
            };
        case ALL_TYPES:
            return {
                ...state, typeResult: payload
            };
        case ALL_POKEMONS:
            return {
                ...state, allPokemon: payload, random: Math.random()
            };
        default:
            return state
    }
}

