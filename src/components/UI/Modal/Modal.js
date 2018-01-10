import React, { Component } from "react";
import classes from './Modal.css';
import WrapperHoc from '../../../hoc/WrapperHoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    //le composant ne s'actualise que s'il y a un changement de sa propriété show ou d'un élément enfant (contenu dans le modal)
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <WrapperHoc>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                    {this.props.children}
                </div>
            </WrapperHoc>
        )
    }
}

export default Modal;