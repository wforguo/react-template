import {GET_DETAIL, GET_LIST, SET_SERIEL} from "../constants";

const defaultState = {
    list: [],
    loading: true,
    seriel: '超越系列'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_LIST: {
            return {
                ...state,
                list: [...action.data],
                loading: false
            };
        }
        case GET_DETAIL: {
            return {
                ...state
            };
        }
        case SET_SERIEL: {
            return {
                ...state,
                seriel: action.seriel
            };
        }
        default:
            return state;
    }
};
