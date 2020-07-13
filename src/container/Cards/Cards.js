import React, {Component} from 'react';
import * as actions from '../../Store/action/index';
import {connect} from 'react-redux';

import CardControl from '../../component/CardControl/CardControl';
import Modal from '../../component/UI/Modal/Modal';
import Spinner from '../../component/UI/Spinner/Spinner';
import OrderSummary from '../../component/CardControl/OrderSummary/OrderSummary';
import Auxillary from '../../Hoc/Auxillary/Auxillary';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-base';
import classes from './Cards.module.css';

class Cards extends Component {

  state = {
    purchasing: false,
};

componentDidMount(){
        
  //console.log(this.props);
  this.props.onInitFood();
}

  updatePurchaseState(foodItem){

    const sum = Object.keys(foodItem)
    .map(foodKey => {
        return foodItem[foodKey];
    }).reduce((sum, el) => {
        return sum + el;
    }, 0);

    return sum > 0;
  }

  purChaseHandler = () => {

    if(this.props.isAuthenticated){
      this.setState({purchasing: true});
    }else{
      this.props.history.push('/auth');
    }
  }
    

purChaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    this.props.onInitPurchased();
    this.props.history.push('/contact-data');
}

  render(){

    const disableInfo = {
      ...this.props.food 
  };

  for (let key in disableInfo){
      disableInfo[key] = disableInfo[key]<=0;
  }

  let orderSummary = null;

  let foodMenu = this.props.errors 
                  ? <div class="jumbotron">
                      <div className = "container">
                        <p className = "text-center">Menu can't be loaded!!</p>
                      </div> 
                    </div>
                  : <Spinner />

  if(this.props.food){
    foodMenu = (
            <Auxillary>
              <CardControl 
                foodAdded = {this.props.onFoodAdded}
                foodRemoved = {this.props.onFoodRemoved} 
                disabled = {disableInfo}
                totalPrice = {this.props.price}
                isAuth = {this.props.isAuthenticated}
                ordered = {this.purChaseHandler}
                purchasable = {this.updatePurchaseState(this.props.food)}/> 
            </Auxillary>
      );

    orderSummary = <OrderSummary  
        foodItem = {this.props.food}
        price = {this.props.price}
        purchaseCaneled = {this.purChaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler} />
  }

    return (
        <Auxillary>
          <Modal show = {this.state.purchasing} modalClosed = {this.purChaseCancelHandler}>
            {orderSummary}
          </Modal>
            <div className ="mt-5">
              <h1 className = {classes.menu}>Menu</h1>
              <p className = {classes.hr}></p>
                {foodMenu}
            </div> 
        </Auxillary> 
    )
  }
}

const mapStateToProps = state => {
  return {
      food: state.foodItems.foods,
      price: state.foodItems.totalPrice,
      errors: state.foodItems.error,
      isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return{
      onFoodAdded: (foodName) => dispatch(actions.addFood(foodName)),
      onFoodRemoved: (foodName) => dispatch(actions.removeFood(foodName)),
      onInitFood: () => dispatch(actions.initFood()),
      onInitPurchased:  () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Cards, axios));