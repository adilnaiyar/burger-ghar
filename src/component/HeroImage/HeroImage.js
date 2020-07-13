import React from 'react';
import cuisineLogo from '../../Assets/Images/burger02.png';
import classes from './HeroImage.module.css';

const HeroImage = () => {
    return(
    <div className ={classes.Banner}>
        <div className="container-fluid" >
            <div className="row ">
                <div className="col-lg-6 ">
                    <h1 className={classes.bigHeading}><em>Burger Ghar</em></h1>
                    <h4 className={classes.smallHeading}><em>Burger Which fill Your Hunger !!!</em></h4>
                </div>
                <div className="col-lg-6 ">
                    <img className = {classes.titleImage} src = {cuisineLogo}  height = "100" alt ="cuisineLogo" />
                </div>
            </div>
        </div>
      </div>
    )
}

export default HeroImage;