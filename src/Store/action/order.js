import * as actionTypes from './actionTypes';
import axios from '../../axios-base';


export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START

    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData, token) => {

    return dispatch => {

        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth=' + token, orderData )
        .then( response => {
            //console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            dispatch(completeOrder('/orders'))
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    }
}

export const fetchOrderStart = () => {
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const fetchOrder = (token, userId) => {
    
        return dispatch => {

            dispatch(fetchOrderStart());
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            axios.get( '/orders.json' + queryParams)
            .then( response => {
                //console.log(response.data)
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                //console.log(fetchedOrders)
                dispatch(fetchOrderSuccess(fetchedOrders));
            } )
            .catch( error => {
                dispatch(fetchOrderFail(error));
            } );
    }
}

export const deleteOrderStart = () => {
    return{
        type: actionTypes.DELETE_Food_START
    }
}

export const deleteOrderSuccess = (foodId) => {
    return{
        type: actionTypes.DELETE_Food_SUCCESS,
        foodIds: foodId
    }
}

export const deleteOrderFail = (error) => {
    return{
        type: actionTypes.DELETE_Food_FAIL,
        error: error
    }
}

export const deleteOrder = (foodId, token) => {
    return dispatch =>{
        dispatch(deleteOrderStart());
        axios.delete('/orders/' + foodId +".json?auth=" + token)
        .then(response => {
            //console.log(response)
            dispatch(deleteOrderSuccess(foodId));
        })
        .catch( error => {
            dispatch(deleteOrderFail(error));
        })
    }
}

export const completeOrder = (path) => {
    return {
        type: actionTypes.COMPLETE_ORDER,
        path: path
        
    }
}
