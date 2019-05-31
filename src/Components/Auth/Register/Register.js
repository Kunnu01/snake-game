import React, { Component } from 'react';
import Button from '../../Button/Button';
import InputTextField from '../InputTextField/InputTextField';
import styles from './Register.module.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
        }
    }

    handleOnChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value,
        })
    }
    
    render() {
        const { email, name, password } = this.state;
        
        return (
            <div className={styles.Register}>
                <h1>Register</h1>
                <InputTextField
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleOnChange('email')}
                />
                <InputTextField
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.handleOnChange('name')}
                />
                <InputTextField
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={this.handleOnChange('password')}
                />
                <Button>Register</Button>
            </div>
        );
    }
}

export default Register;;