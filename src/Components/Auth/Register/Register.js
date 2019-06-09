import React, { Component } from 'react';
import Button from '../../Button/Button';
import InputTextField from '../InputTextField/InputTextField';
import styles from './Register.module.css';
import axios from '../../../axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            isLoading: false,
        }
    }

    alreadyExists = async (email) => {
        try {
            const res = await axios.get('users.json')
            const fetchedUsers = [];
            for (let key in res.data) {
                fetchedUsers.push({
                    ...res.data[key],
                    id: key
                });
            }
            const user = fetchedUsers.find(user => user.email === email);
            if(user) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    handleSubmit = async () => {
        this.setState({isLoading: true});
        const { modalClosed } = this.props;
        const { email, name, password } = this.state;
        const data = { email, name, password };
        const user  = await this.alreadyExists(email);
        if (user) {
            alert('User already exists');
            modalClosed();
            return;
        }
        axios.post('users.json', data)
            .then(res => {
                this.setState({isLoading: false})
                modalClosed();
            })
            .catch(err => {
                this.setState({isLoading: false})
                modalClosed();
            });
    }

    handleOnChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value,
        })
    }
    
    render() {
        const { email, name, password, isLoading } = this.state;
        
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
                <Button onClick={this.handleSubmit} disabled={isLoading}>
                    { isLoading ? 'Loading...' : 'Register'}
                </Button>
            </div>
        );
    }
}

export default Register;;