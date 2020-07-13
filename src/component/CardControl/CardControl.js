import React from 'react';
import FoodMenu from './FoodMenu/FoodMenu';
import classes from './CardControl.module.css';

const Controls = [
    {id: 1, title: 'Firey Chicken ',     type: 'fieryChicken', image: "food01.jpg", foodPrice: "100"},
    {id: 2, title: 'Veg Cheese',         type: 'vegCheese',    image: "food02.jpg", foodPrice: "60"},
    {id: 3,  title: 'Paneer Cheese',      type: 'paneerCheese', image: "food03.jpg", foodPrice: "80"},
    
];

const CardControl = (props) => (

        <div className = "container-fluid">
            <div className = "row justify-content-center">
                <div className = {classes.CardControlss}>
                    <div className = "card bg-dark shadow mb-2" style={{width: "12rem"}} >
                        <p className = {classes.priceText}>Current Price: Rs. <strong>{props.totalPrice.toFixed(2)}</strong></p>
                    </div> 
                        {Controls.map(item => ( 
                            <div className = "card text-white bg-dark col-xs-12 col-sm-6 col-md-6 col-lg-6 shadow mb-1">
                                <FoodMenu  
                                    key = {item.id}
                                    label = {item.title}
                                    images = {item.image}
                                    foodPrice = {item.foodPrice}
                                    added = {() => props.foodAdded(item.type)}
                                    removed = {() => props.foodRemoved(item.type)}
                                    disabled = {props.disabled[item.type]} />  
                            </div>
                        ))}
                    <button 
                    className = "btn btn-success shadow mt-3" 
                    disabled = {!props.purchasable}
                    onClick = {props.ordered}> {props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>
                </div>
            </div>
        </div>
    
    )

export default CardControl;