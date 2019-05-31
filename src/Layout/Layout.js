import React from 'react';
import { NavBar } from '../Components';
import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <div>
            <NavBar />
            <main className={styles.Content}>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;