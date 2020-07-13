import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
 return (
    <div className="container-fluid ">
    <p className = {classes.hr}></p>
      <p className = "text-center"> &copy; {new Date().getFullYear()} <em>Burger Ghar</em></p>
    </div>
 )
};

export default Footer;