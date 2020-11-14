import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    currentTheme:"light",
}

const systemReducer = (state = INITIAL_STATE, action) => {
    const {type,payLoad} = action;

    switch(type)
        {
            case actionTypes.SET_CURRENT_THEME:
                    return {...state, currentTheme:payLoad};
            default:
                return {...state};        

        }

}

export default systemReducer;