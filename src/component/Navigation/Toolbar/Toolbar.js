import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const Toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems  isAuthenticated = {props.isAuth}/>
        </nav>
    </header>
    
);

export default Toolbar;