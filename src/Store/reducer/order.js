import * as actionTypes from '../action/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    completeOrder: '/orders',
    message: null,
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }

        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true,
            }

        case actionTypes.PURCHASE_BURGER_SUCCESS:

            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }

            return {
                ...state,
                loading: false,
                purchased:true,
                orders: state.orders.concat(newOrder)
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            }

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
            
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_Food_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.DELETE_Food_SUCCESS:
            const updatedArray = state.orders.filter(order => order.id !== action.foodIds);
        return{
            ...state,
            loading: false,
            orders: updatedArray,
            message: 'Order is Removed!!'
        }
        case actionTypes.DELETE_Food_FAIL:
        return{
            ...state,
            loading: false,
            message: 'Fail To Remove Order !!'
        }
        case actionTypes.COMPLETE_ORDER:
        return{
            ...state,
            completeOrder: action.path,
            message: 'Your Order Is Placed !!'
        }

        default:
            return state;
        }
    }

    export default reducer;