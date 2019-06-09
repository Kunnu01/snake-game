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

    handleLogout = () => {
        localStorage.removeItem('user');
    }

    renderForm = () => {
        const { login, register } = this.state;

        if (login)
            return <Login modalClosed={() => this.handleModalClose('login')} />;
        else if (register)
            return <Register modalClosed={() => this.handleModalClose('register')} />;
        
        return null;
    }

    renderAuthOptions = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            return (
                <>
                    <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => this.handleModalOpen('register')}>Register</h2>
                    <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => this.handleModalOpen('login')}>Login</h2>
                </>
            )
        }
        else {
            return (
                <>
                    <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={() => this.handleModalOpen('register')}>LeaderBoard</h2>
                    <h2 style={{cursor: 'pointer', marginLeft: '20px'}} onClick={this.handleLogout}>Logout</h2>
                </>
            )
        }
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
                        {this.renderAuthOptions()}
                    </div>
                </nav>
            </div>
        );
    }
};

export default NavBar;