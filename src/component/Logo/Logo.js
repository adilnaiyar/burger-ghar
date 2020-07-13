import React from 'react';
import cuisineLogo from '../../Assets/Images/burger02.png';
import classes from './Logo.module.css';

const Logo = () => (
    <div className = {classes.Logo}>
        <img src = {cuisineLogo}   alt ="cuisineLogo"/>
    </div>
);

export default Logo;