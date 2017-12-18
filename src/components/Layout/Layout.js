import React, { Component } from 'react';

import Aux from '../../hoc/WrapperHoc';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state= {
        showSideDrawer: false
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {return {showSideDrawer: !prevState.showSideDrawer}});
    }
    
    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
        <Aux>
            <Toolbar clicked={this.SideDrawerToggleHandler} />
            <SideDrawer opened={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )};
}
export default Layout;