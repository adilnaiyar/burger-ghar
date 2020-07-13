import React, {Component} from 'react';
import Auxillary from '../../../Hoc/Auxillary/Auxillary';

class OrderSummary extends Component{

    render() {

        const foodSummary = Object.keys(this.props.foodItem).filter(foodKey => this.props.foodItem[foodKey] > 0)
        .map(foodKey => {
            
            return (
                <li key = {foodKey}>
                    <span style = {{textTransform: 'capitalize'}}> {foodKey}</span>: {this.props.foodItem[foodKey]}
                </li>
            );   
        });

        return(
            <Auxillary>
                <div className = "container-fluid ">
                    <div className = "row justify-content-center">
                        <div className = "col-md-6">
                        <h3>Seleted Burger</h3>
                            <ul>
                               {foodSummary} 
                            </ul>
                            <p><strong>Total Price: Rs {this.props.price.toFixed(2)}</strong> </p>
                            <p>Continue To CheckOut ?</p>
                            <button className = "btn btn-outline-danger btn-sm mr-2" onClick = {this.props.purchaseCaneled}>CANCEL</button>
                            <button className = "btn btn-outline-success btn-sm" onClick= {this.props.purchaseContinued}>CONTINUE</button>
                        </div>
                    </div>
                </div>
            </Auxillary>
        );
    }
};

export default OrderSummary;