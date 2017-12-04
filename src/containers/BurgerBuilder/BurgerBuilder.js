import React, { Component } from 'react';

import Aux from '../../hoc/WrapperHoc';

class BurgerBuilder extends Component {
    render() {
        return(
            <Aux>
                <div>Burger</div>
                <div>Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;