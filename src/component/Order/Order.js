import React from 'react';
import {connect} from 'react-redux';

import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-base';
import * as actions from '../../Store/action/index';
import classes from './Order.module.css';

const Order= (props) => {
    
    const foodItems = [];

    for(let foodName in props.foodItem)
    {
        foodItems.push({
            
            name: foodName,
            amount: props.foodItem[foodName]
        })
    }

    const foodItemsOutput = foodItems.filter(foods => foods.amount >0)
        .map(foods => {
            return <span 
                style = {{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key= {foods.name}>{foods.name} ({foods.amount})</span>
    })

    const deleteHandler = () => {
        props.onDeleteFood(props.id, props.token);
    }

    return(
        <div className = {classes.Order}>
            <div className = "row justify-content-center">
                <div className = "col-md-6">
                    <p>Food-Item: {foodItemsOutput}</p>
                    <p>Price: <strong>Rs {Number.parseFloat(props.price).toFixed(2)}</strong></p>
                </div>
                <div className = "col-md-6 mt-4">
                    <button className = "btn btn-danger btn-sm " onClick = {deleteHandler}> Remove </button>
                </div>
            </div>
        </div> 
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteFood: (foodId, token) => dispatch(actions.deleteOrder(foodId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Order, axios));