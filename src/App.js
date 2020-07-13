import React, {Component} from 'react';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './container/Layout/Layout';
import Card from './container/Cards/Cards';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './Store/action//index';
import asyncComponent from './Hoc/asyncComponent/asyncComponent';
import './App.css';

const asyncContactData = asyncComponent(() => {
  return import ('./container/ContactData/ContactData');
});

const asyncOrders = asyncComponent(() => {
return import ('./container/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
return import ('./container/Auth/Auth');
});

class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Card} />
        <Route render= {() => <h3 className = "text-center">Page! Not Found</h3>} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
            <Switch>
              <Route path = "/contact-data" component = {asyncContactData} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={asyncAuth} />
              <Route path="/" exact component={Card} />
              <Route render= {() => <h3 className = "text-center" >Page! Not Found</h3>} />
              <Redirect to="/" />
            </Switch>
      )
    }

    return(
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
