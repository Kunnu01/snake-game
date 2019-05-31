import React, { Component } from 'react';
import { Modal, Register, Login } from '../../Components';
import styles from './NavBar.module.css';

const style = {
    display: 'flex',
    justifyContent: 'space-between',
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            login: false,
        }
    }

    handleModalOpen = (name) => {
        this.setState({
            [name]: true,
        });
    }

    handleModalClose = () => {
        this.setState({
            register: false,
            login: false,
        });
    }

    renderForm = () => {
        const { login, register } = this.state;

        if (login)
            return <Login />;
        else if (register)
            return <Register />;
        
        return null;
    }

    render() {
        const { register, login } = this.state;
        

        return (
            <div>
                <nav className={styles.NavBar}>
                    <h2 style={{cursor: 'pointer'}}>Snake Game</h2>
                    <div style={style}>
                        <Modal show={register || login} modalClosed={this.handleModalClose}>
                            {this.renderForm()}
                        </Modal>
                        <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => this.handleModalOpen('register')}>Register</h2>
                        <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => this.handleModalOpen('login')}>Login</h2>
                    </div>
                </nav>
            </div>
        );
    }
};

export default NavBar;