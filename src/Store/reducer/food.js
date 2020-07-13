import * as actionTypes from '../action/actionTypes';

const initialState = {
    foods: null,
    totalPrice: 0,
    error: false,
    building: false
}

const FOOD_PRICE = {
    fieryChicken: 100,
    vegCheese: 60,
    paneerCheese:  80,
}

const reducer  = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_FOOD:
            return{
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] + 1
                },
                totalPrice: state.totalPrice + FOOD_PRICE[action.foodName],
                building: true
            };
        case actionTypes.REMOVE_FOOD:
            return{
                ...state,
                foods: {
                    ...state.foods,
                    [action.foodName]: state.foods[action.foodName] - 1
                },
                totalPrice: state.totalPrice - FOOD_PRICE[action.foodName],
                building: true
            }
        case actionTypes.SET_FOOD:
            return{
                ...state,
                foods: action.foodItem,
                totalPrice: 0,
                error: false,
                building: false
            }
        case actionTypes.FETCH_FOOD_FAIL:
            return{
                ...state,
                error: true
            }     
        default:
            return state;
    }
}

export default reducer;
