import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxillary from '../../Hoc/Auxillary/Auxillary';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';
import HeroImage from '../../component/HeroImage/HeroImage';
import Footer from '../../component/Footer/Footer';
import classes from './Layout.module.css';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render(){
        return(
            <Auxillary>
                 <Toolbar 
                  isAuth = {this.props.isAuthenticated}
                  drawerToggleClicked= {this.sideDrawerToggleHandler} />
                 <SideDrawer 
                  isAuth = {this.props.isAuthenticated}
                  show = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                 <HeroImage  />
                 <main className = {classes.content}>
                    {this.props.children}
                 </main>
                 <Footer  />
            </Auxillary>
          
        );
      }
    }

    const mapStateToProps = state => {
        return{
            isAuthenticated: state.auth.token !== null
        }
    }

export default connect(mapStateToProps)(Layout);