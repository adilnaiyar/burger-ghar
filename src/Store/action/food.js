import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const addFood = (name) => {

    return {
        type: actionTypes.ADD_FOOD,
        foodName: name

    }
};

export const removeFood = (name) => {

    return {
        type: actionTypes.REMOVE_FOOD,
        foodName: name

    }
};

export const setFood = (food) => {
    return {
        type: actionTypes.SET_FOOD,
        foodItem: food
    }
};

export const fetchFoodFail = () => {
    return {
        type: actionTypes.FETCH_FOOD_FAIL,
    }
};

export const initFood = () => {
    return dispatch => {
        axios.get('https://burger-ghar.firebaseio.com/foodMenu.json')
        .then(response => {
            dispatch(setFood(response.data))
        })
        .catch(error => {
            dispatch(fetchFoodFail())
        });
    }
}