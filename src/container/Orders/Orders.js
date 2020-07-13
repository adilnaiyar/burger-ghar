import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../component/Order/Order';
import axios from '../../axios-base';

import * as actions from '../../Store/action/index';
import withErrorhandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../component/UI/Spinner/Spinner';
import classes from './Order.module.css';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders = <Spinner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                key = {order.id}
                id = {order.id}
                foodItem = {order.foodItem}
                price = {order.price}/>
            ));
            
        };

        let messages = null
        if(this.props.message){
            messages = (
                <div className = "row justify-content-center">
                    <div className = "col-md-6">
                        <div className="alert alert-success alert-dismissible">
                            <a href="/#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Success!</strong> {this.props.message}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className = "container-fluid">
                <h2 className = {classes.heading}>Your Order </h2>
                {messages}
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return{
        orders: state.orderItems.orders,
        loading: state.orderItems.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        message: state.orderItems.message
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhandler(Orders, axios));