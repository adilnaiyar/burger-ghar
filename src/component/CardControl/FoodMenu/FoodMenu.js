import React from 'react';
//import {connect} from 'react-redux';
import classes from './FoodMenu.module.css';

const FoodMenu = (props) => {

    return (
            <div className = {classes.BuildControl}>
                <div><img className = "img-fluid" width = "80" src={require(`../../../Assets/Images/${props.images}`)} alt = "foodImage"/></div>
                <div className = {classes.Label}>{props.label}</div>
                <p> Rs. {props.foodPrice}/- </p>
                <button className = {classes.Less} onClick = {props.removed} disabled = {props.disabled} >Less</button>
                <button className = {classes.More} onClick = {props.added}>More</button>
            </div>
           
    )
}

export default FoodMenu;