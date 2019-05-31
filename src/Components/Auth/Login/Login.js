import React, { Component } from 'react';
import Button from '../../Button/Button';
import InputTextField from '../InputTextField/InputTextField';
import styles from './Login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleOnChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value,
        })
    }

    render() {
        return (
            <div className={styles.Login}>
                <h1>Login</h1>
                <InputTextField
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleOnChange('email')}
                />
                <InputTextField
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handleOnChange('Password')}
                />
                <Button>Login</Button>
            </div>
        );
    }
}

export default Login;