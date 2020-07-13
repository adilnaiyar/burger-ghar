import React from 'react';
import Auxillary from '../../../Hoc/Auxillary/Auxillary';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/BackDrop/BackDrop';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.show)
    {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return(
            <Auxillary>
                    <BackDrop  show = {props.show} clicked = {props.closed}/>
                        <div className = {attachedClasses.join(' ')} onClick = {props.closed}>
                            <div className = {classes.Logo}>
                                <Logo / >
                            </div>
                            <nav>
                                <NavigationItems isAuthenticated = {props.isAuth}/>
                            </nav>
                        </div>
            </Auxillary>
    );
};

export default SideDrawer;