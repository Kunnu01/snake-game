import React, { Component } from 'react';
import Button from '../../Button/Button';
import InputTextField from '../InputTextField/InputTextField';
import axios from '../../../axios';
import styles from './Login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
        }
    }

    checkCredentials = async (email, password) => {
        try {
            this.setState({isLoading: true});
            const res = await axios.get('users.json');
            const fetchedUsers = [];
            for (let key in res.data) {
                fetchedUsers.push({
                    ...res.data[key],
                    id: key
                });
            }
            const user = fetchedUsers.find(user => user.email === email);
            if (!user) {
                alert('User does not exists');
                return false;
            } else if (user.password !== password) {
                alert('Incorrect Password');
                return false;
            } else {
                localStorage.setItem('user', user);
                return true;
            }
        } catch(error) {
            throw error;
        }
    }

    handleSubmit = async () => {
        const { modalClosed } = this.props;
        const { email, password } = this.state;
        await this.checkCredentials(email, password)
        this.setState({isLoading: false});
        modalClosed();
    }

    handleOnChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value,
        })
    }

    render() {
        const { isLoading } = this.state;
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
                    onChange={this.handleOnChange('password')}
                />
                <Button onClick={this.handleSubmit}>
                    { isLoading ? 'Loading...' : 'Login'}
                </Button>
            </div>
        );
    }
}

export default Login;