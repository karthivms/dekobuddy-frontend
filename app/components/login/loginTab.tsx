'use client'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Login from './login';
import SignUp from './signUp';


export default function LoginTab() {

    return (
        <>
            <Tabs
                defaultActiveKey="Login"
                className="login-tab"
            >
                <Tab eventKey="Login" title="Login" className='py-4 w-100'>
                    <Login />
                </Tab>
                <Tab eventKey="Signup" title="Signup" className='py-4 w-100'>
                    <SignUp />
                </Tab>
            </Tabs>
        </>
    )
}