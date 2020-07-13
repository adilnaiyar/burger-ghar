import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <li className={classes.NavigationItem}><NavLink to = "/" exact  activeClassName = {classes.active}> FoodMenu </NavLink></li>
        {props.isAuthenticated ? <li className={classes.NavigationItem}><NavLink to = "/orders" activeClassName = {classes.active}> Order </NavLink></li> : null }
        {props.isAuthenticated  
        ? <li className={classes.NavigationItem}><NavLink to = "/logout" activeClassName = {classes.active}>    Logout </NavLink></li>
        : <li className={classes.NavigationItem}><NavLink to = "/auth" activeClassName = {classes.active}> Authenticate </NavLink></li> }
    </ul>
);

export default NavigationItems;