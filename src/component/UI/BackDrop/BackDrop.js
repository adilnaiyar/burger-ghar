import React from 'react';
import classes from './BackDrop.module.css';

const BackDrawer = (props) => (
    props.show ? <div className = {classes.BackDrop} onClick = {props.clicked}></div>: null
);

export default BackDrawer;