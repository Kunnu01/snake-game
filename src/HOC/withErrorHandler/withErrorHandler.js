import React, { Component } from 'react';
import { Modal } from '../../Components';

const WithErrorHandler = (WrappedComponent, axios) => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }
    
    componentWillMount () {
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({
                error: null,
            });
            return req;
        });
        this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({
                error,
            });
        });
    }

    componentWillUnmount () {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }
    
    errorConfirmedHandler = () => {
        this.setState({
            error: null,
        });
    }

    render() {
        const { error } = this.state;
        return (
            <>
                <Modal show={error} modalClosed={this.errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </>
        )
    }
}

export default WithErrorHandler;