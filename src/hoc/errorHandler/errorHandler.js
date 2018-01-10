import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import WrapperHoc from '../WrapperHoc';

//Higher order component pour le traitement des erreurs de reqûetes db, affiche le message d'erreur dans un modal
const errorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            //Lors d'une requête, établit error à null puis retourne la requête pour poursuite
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            //Lors de la réponse, retourne la réponse si OK ou transmet l'erreur au state
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            //Destruction des intercepteurs lorsque le composant est retiré pour éviter des erreurs et optimiser l'usage de la mémoire
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        //Syntaxe ES6 pour que le 'this' fonctionne correctement, remise de error à null
        errorCheckedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <WrapperHoc>
                    {/* Modal montré si une erreur est retournée */}
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorCheckedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    {/* Le composant décoré par ce hoc */}
                    <WrappedComponent {...this.props} />
                    
                </WrapperHoc>
            );
        }
    }
}

export default errorHandler;